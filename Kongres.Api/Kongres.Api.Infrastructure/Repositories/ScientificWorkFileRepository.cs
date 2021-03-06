﻿using System.Collections.Generic;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class ScientificWorkFileRepository : IScientificWorkFileRepository
    {
        private readonly KongresDbContext _context;

        public ScientificWorkFileRepository(KongresDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(ScientificWorkFile scientificWorkFile)
        {
            await _context.ScientificWorkFiles.AddAsync(scientificWorkFile);
            await _context.SaveChangesAsync();
        }

        public async Task<ScientificWorkFile> GetNewestVersionAsync(uint workId)
            => await _context.ScientificWorkFiles.Where(x => x.ScientificWork.Id == workId)
                                                 .OrderByDescending(x => x.Version)
                                                 .FirstAsync();
        public async Task<ScientificWorkFile> GetNewestVersionWithReviewsAsync(uint workId)
            => await _context.ScientificWorkFiles.Include(x => x.Reviews)
                                                    .ThenInclude(x => x.Reviewer)
                                                 .Where(x => x.ScientificWork.Id == workId)
                                                 .OrderByDescending(x => x.Version)
                                                 .FirstAsync();

        public async Task<IEnumerable<ScientificWorkFile>> GetVersionsWithReviews(uint workId)
            => await _context.ScientificWorkFiles.Include(x => x.ScientificWork)
                                                 .Include(x => x.Reviews)
                                                    .ThenInclude(x => x.Answer)
                                                 .Include(x => x.Reviews)
                                                    .ThenInclude(x => x.Reviewer)
                                                 .Where(x => x.ScientificWork.Id == workId)
                                                 .ToListAsync();

        public int GetReviewsCountInNewestVersion(uint workId)
            => _context.ScientificWorkFiles.Where(x => x.ScientificWork.Id == workId)
                                           .OrderByDescending(x => x.Version)
                                           .First().Reviews.Count();

        public async Task<int> GetRatingSumFromVersion(uint versionId)
            => await _context.ScientificWorkFiles.Where(x => x.Id == versionId)
                                                 .Select(x => x.Reviews.Sum(y => y.Rating))
                                                 .SingleAsync();

        public async Task AddRatingAsync(ScientificWorkFile scientificWorkFile)
        {
            _context.ScientificWorkFiles.Update(scientificWorkFile);
            await _context.SaveChangesAsync();
        }
    }
}
