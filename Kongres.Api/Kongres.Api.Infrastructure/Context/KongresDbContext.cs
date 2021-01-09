using Microsoft.EntityFrameworkCore;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Infrastructure.Context
{
    public class KongresDbContext : DbContext
    {
        public KongresDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Answer> Answers { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ReviewersScienceWork> ReviewersScienceWorks { get; set; }
        public DbSet<ScientificWork> ScientificWorks { get; set; }
        public DbSet<ScientificWorkFile> ScientificWorkFiles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}