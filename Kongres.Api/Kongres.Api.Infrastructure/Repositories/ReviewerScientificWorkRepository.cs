﻿using System.Collections.Generic;
using System.Linq;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using System.Threading.Tasks;
using Kongres.Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class ReviewerScientificWorkRepository : IReviewerScientificWorkRepository
    {
        private readonly KongresDbContext _context;

        public ReviewerScientificWorkRepository(KongresDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ScientificWork> GetListOfWorksForReviewer(uint reviewerId)
            => _context.ReviewersScienceWorks.Include(x => x.ScientificWork)
                                                .ThenInclude(x => x.Versions)
                                             .Include(x => x.ScientificWork)
                                                .ThenInclude(x => x.MainAuthor)
                                             .Where(x => x.User.Id == reviewerId)
                                             .Select(x => x.ScientificWork);
        public async Task AddAsync(IEnumerable<ReviewersScienceWork> reviewersScienceWorks)
        {
            await _context.ReviewersScienceWorks.AddRangeAsync(reviewersScienceWorks);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<string>> GetEmailsOfReviewersByWorkIdAsync(uint scientificWorkId)
            => await _context.ReviewersScienceWorks.Where(x => x.ScientificWork.Id == scientificWorkId)
                                                   .Select(x => x.User.Email)
                                                   .ToListAsync();

        public int GetReviewersCount(uint scientificWorkId)
            => _context.ReviewersScienceWorks.Count(x => x.ScientificWork.Id == scientificWorkId);


        // check if reviewer is assign to given scientific work
        public async Task<bool> IsReviewerAsync(uint scientificWorkId, uint userId)
            => await _context.ReviewersScienceWorks.Include(x => x.User)
                                                   .Include(x => x.ScientificWork)
                                                   .AnyAsync(x => x.ScientificWork.Id == scientificWorkId &&
                                                                  x.User.Id == userId);

        public async Task<bool> IsReviewerOfScientificWorkAsync(uint userId, uint scientificWorkId)
            => await _context.ReviewersScienceWorks.Include(x => x.ScientificWork)
                                                   .Include(x => x.User)
                                                   .AnyAsync(x => x.User.Id == userId &&
                                                                  x.ScientificWork.Id == scientificWorkId);
    }
}
