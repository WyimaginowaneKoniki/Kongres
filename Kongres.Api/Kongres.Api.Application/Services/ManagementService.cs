using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Kongres.Api.Application.Services
{
    public class ManagementService : IManagementService
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IReviewerRepository _reviewerRepository;
        private readonly IReviewersScienceWorkRepository _reviewersScienceWorkRepository;
        private readonly IUserRepository _userRepository;
        private readonly IEmailSender _emailSender;

        public ManagementService(IScientificWorkRepository scientificWorkRepository,
                            IReviewerRepository reviewerRepository,
                            IReviewersScienceWorkRepository reviewersScienceWorkRepository,
                            IUserRepository userRepository,
                            IEmailSender emailSender)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _reviewerRepository = reviewerRepository;
            _reviewersScienceWorkRepository = reviewersScienceWorkRepository;
            _userRepository = userRepository;
            _emailSender = emailSender;
        }

        public async Task AssignReviewersToScientificWorkAsync()
        {
            var categories = new[] { "Computer Science", "Mathematics", "Biology", "Chemistry", "Psychics", "Geography" };
            foreach (var category in categories)
            {
                // get reviewers and scientific works
                var scientificWorks = await _scientificWorkRepository.GetAllBySpecializationAsync(category);
                var reviewers = await _reviewerRepository.GetAllBySpecializationAsync(category);

                // get work's ids
                // and
                // try to find id of reviewer which register with same email as author of the work
                // when author (probably) has one account, assign 0 as id
                var scientificWorkIds = scientificWorks.Select(x =>
                    (
                        id: x.Id,
                        authorAsReviewerId: reviewers.SingleOrDefault(y => y.Email == x.MainAuthor.Email)?.Id ?? 0
                    )).ToArray();

                var reviewerIds = reviewers.Select(x => x.Id).ToArray();

                // TODO: Send information to authors/reviewers about too small number of works/reviewers
                if (reviewerIds.Length < 4 || scientificWorkIds.Count() < 4)
                    continue;

                var scientificWoksWithReviewers = RandomizeReviewers(scientificWorkIds, reviewerIds);

                // save assignment to db
                var reviewersScientificWorks = new List<ReviewersScienceWork>();
                foreach (var (workId, reviewersId) in scientificWoksWithReviewers)
                {
                    for (var i = 0; i < reviewersId.Count; i++)
                    {
                        reviewersScientificWorks.Add(new ReviewersScienceWork()
                        {
                            ScientificWork = scientificWorks.Single(x => x.Id == workId),
                            User = reviewers.Single(x => x.Id == reviewersId[i])
                        });

                        // Send email to reviewer about work to review
                        var reviewerEmail = _userRepository.GetEmailById(reviewersId[i]);
                        await _emailSender.SendWorkAssignmentInformationAsync(reviewerEmail, workId);
                    }

                    // Send email to author of work about preparing to review

                }

                await _reviewersScienceWorkRepository.AddAsync(reviewersScientificWorks);
            }
        }

        private Dictionary<uint, List<uint>> RandomizeReviewers(IList<(uint id, uint authorAsReviewerId)> works, uint[] reviewers)
        {
            var numberOfAssignReviewers = 3;
            if (works.Count < reviewers.Length)
                numberOfAssignReviewers = 4;

            var n = (int)Math.Round((float)reviewers.Length / reviewers.Length);
            var reviewWorkAssignCount = n < numberOfAssignReviewers ? numberOfAssignReviewers : n;

            // store assign reviewers to scientific works
            var scientificWorks = new Dictionary<uint, List<uint>>();

            // 'assign' authors to scientific works to be sure
            // that author won't be a reviewer of the work
            for (var i = 0; i < works.Count; i++)
                scientificWorks[works[i].id] = new List<uint>() { works[i].authorAsReviewerId };

            // set current pool,
            // from this algorithm will select reviewers
            var reviewersPool = new List<uint>(reviewers);

            var rnd = new Random();

            for (var i = 0; i < reviewWorkAssignCount; i++)
            {
                // For every work
                for (var j = 0; j < works.Count; j++)
                {
                    // when reviewers pool is empty
                    // or
                    // current scientific work contains all reviewers from pool
                    //
                    // add new poll with reviewers
                    if (reviewersPool.Count == 0 || reviewersPool.All(x => scientificWorks[works[j].id].Contains(x)))
                        reviewersPool.AddRange(new List<uint>(reviewers));

                    // until randomized reviewer is assign to the scientific work
                    // algorithm has to random next number
                    int randomId;
                    do
                    {
                        randomId = rnd.Next(reviewersPool.Count);
                    } while (scientificWorks[works[j].id].Contains(reviewersPool[randomId]));

                    // assign selected reviewer to scientific work
                    scientificWorks[works[j].id].Add(reviewersPool[randomId]);

                    // remove reviewer from current pool
                    reviewersPool.RemoveAt(randomId);
                }
            }

            // when some reviewers are still in pool
            // we can try assign them to scientific works
            if (reviewersPool.Count > 0)
            {
                // enumerate every scientific work
                for (var i = 0; i < works.Count; i++)
                {
                    // try get reviewers which current scientific work doesn't have
                    var rest = reviewersPool.Where(x => !scientificWorks[works[i].id].Contains(x))
                                            .ToArray();

                    // then move to the next scientific work
                    // if there is no reviewers left for it
                    if (rest.Length == 0)
                        continue;

                    // otherwise assign first reviewers
                    scientificWorks[works[i].id].Add(rest[0]);
                    reviewersPool.Remove(rest[0]);
                }
            }

            // when all reviewers are added
            // we can finally "remove" authors from the work
            for (var i = 0; i < works.Count; i++)
                scientificWorks[works[i].id].Remove(works[i].authorAsReviewerId);

            return scientificWorks;
        }
    }
}
