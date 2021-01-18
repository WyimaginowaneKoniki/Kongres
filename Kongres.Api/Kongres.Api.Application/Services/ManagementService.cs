using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Repositories.Interfaces;

namespace Kongres.Api.Application.Services
{
    public class ManagementService : IManagementService
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IReviewerRepository _reviewerRepository;
        private readonly IReviewersScienceWorkRepository _reviewersScienceWorkRepository;

        public ManagementService(IScientificWorkRepository scientificWorkRepository,
                            IReviewerRepository reviewerRepository,
                            IReviewersScienceWorkRepository reviewersScienceWorkRepository)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _reviewerRepository = reviewerRepository;
            _reviewersScienceWorkRepository = reviewersScienceWorkRepository;
        }

        public async Task AssignReviewersToScientificWorkAsync()
        {
            var categories = new[] { "Computer Science", "Mathematics", "Biology", "Chemistry", "Psychics", "Geography" };
            foreach (var category in categories)
            {
                // Get reviewers and scientific works
                var scientificWorks = await _scientificWorkRepository.GetAllBySpecializationAsync(category);
                var reviewers = await _reviewerRepository.GetAllBySpecializationAsync(category);

                // Randomize Reviewers for scientific works
                var scientificWorkIds = scientificWorks.Select(x => x.Id).ToArray();
                var reviewerIds = reviewers.Select(x => x.Id).ToArray();
                var scientificWoksWithReviewers = RandomizeReviewers(scientificWorkIds, reviewerIds);

                // Save assignment to db
                var reviewersScientificWorks = new List<ReviewersScienceWork>();
                foreach (var (key, value) in scientificWoksWithReviewers)
                {
                    for (var i = 0; i < value.Count; i++)
                    {
                        reviewersScientificWorks.Add(new ReviewersScienceWork()
                        {
                            ScientificWork = scientificWorks.Single(x => x.Id == key),
                            User = reviewers.Single(x => x.Id == value[i])
                        });

                    }
                }

                await _reviewersScienceWorkRepository.AddAsync(reviewersScientificWorks);
            }
        }

        private Dictionary<uint, List<uint>> RandomizeReviewers(uint[] works, uint[] reviewers)
        {
            var numberOfAssignReviewers = 3;
            if (works.Length < reviewers.Length)
                numberOfAssignReviewers = 4;

            var n = (int)Math.Round((float)reviewers.Length / reviewers.Length);
            var reviewWorkAssignCount = n < numberOfAssignReviewers ? numberOfAssignReviewers : n;

            // store assign reviewers to scientific works
            var scientificWorks = new Dictionary<uint, List<uint>>();

            for (var i = 0; i < works.Count(); i++)
                scientificWorks[works[i]] = new List<uint>();

            // set current pool,
            // from this algorithm will select reviewers
            var reviewersPool = new List<uint>(reviewers);

            var rnd = new Random();

            for (var i = 0; i < reviewWorkAssignCount; i++)
            {
                // For every work
                for (var j = 0; j < works.Length; j++)
                {
                    // when reviewers pool is empty
                    // or
                    // current scientific work contains all reviewers from pool
                    //
                    // add new poll with reviewers
                    if (reviewersPool.Count == 0 || reviewersPool.All(x => scientificWorks[works[j]].Contains(x)))
                        reviewersPool.AddRange(new List<uint>(reviewers));

                    // until randomized reviewer is assign to the scientific work
                    // algorithm has to random next number
                    int randomId;
                    do
                    {
                        randomId = rnd.Next(reviewersPool.Count);
                    } while (scientificWorks[works[j]].Contains(reviewersPool[randomId]));

                    // assign selected reviewer to scientific work
                    scientificWorks[works[j]].Add(reviewersPool[randomId]);

                    // remove reviewer from current pool
                    reviewersPool.RemoveAt(randomId);
                }
            }

            // when some reviewers are still in pool
            // we can try assign them to scientific works
            if (reviewersPool.Count > 0)
            {
                // enumerate every scientific work
                for (var i = 0; i < works.Length; i++)
                {
                    // try get reviewers which current scientific work doesn't have
                    var rest = reviewersPool.Where(x => !scientificWorks[works[i]].Contains(x))
                                            .ToArray();

                    // then move to the next scientific work
                    // if there is no reviewers left for it
                    if (rest.Length == 0)
                        continue;

                    // otherwise assign first reviewers
                    scientificWorks[works[i]].Add(rest[0]);
                    reviewersPool.Remove(rest[0]);
                }
            }

            return scientificWorks;
        }
    }
}
