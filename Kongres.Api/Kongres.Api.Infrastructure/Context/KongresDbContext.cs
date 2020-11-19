using Microsoft.EntityFrameworkCore;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Infrastructure.Context
{
    public class KongresDbContext : DbContext
    {
        public KongresDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ReviewersScienceWork> ReviewersScienceWorks { get; set; }
        public DbSet<ScienceWork> ScienceWorks { get; set; }
        public DbSet<User> Users {get; set;}
    }
}