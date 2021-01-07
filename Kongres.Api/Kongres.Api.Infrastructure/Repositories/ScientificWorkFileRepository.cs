﻿using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
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

        public async Task AddAsync(ScienceWorkFile scientificWorkFile)
        {
            await _context.ScienceWorkFiles.AddAsync(scientificWorkFile);
            await _context.SaveChangesAsync();
        }
    }
}
