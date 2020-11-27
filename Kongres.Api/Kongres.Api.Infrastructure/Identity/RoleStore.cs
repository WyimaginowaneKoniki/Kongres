using Kongres.Api.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Kongres.Api.Infrastructure.Identity
{
    public class RoleStore : IRoleStore<Role>
    {
        private readonly KongresDbContext _context;

        public RoleStore(KongresDbContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context?.Dispose();
            }
        }

        public async Task<IdentityResult> CreateAsync(Role role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            await _context.Roles.AddAsync(role, cancellationToken);

            var affectedRows = await _context.SaveChangesAsync(cancellationToken);
            return affectedRows > 0
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError { Description = $"Could not create role {role.Name}." });
        }

        public async Task<IdentityResult> UpdateAsync(Role role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            _context.Roles.Update(role);

            var affectedRows = await _context.SaveChangesAsync(cancellationToken);
            return affectedRows > 0
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError { Description = $"Could not update role {role.Name}." });
        }

        public async Task<IdentityResult> DeleteAsync(Role role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            _context.Roles.Remove(role);

            var affectedRows = await _context.SaveChangesAsync(cancellationToken);
            return affectedRows > 0
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError { Description = $"Could not remove role {role.Name}." });
        }

        public Task<string> GetRoleIdAsync(Role role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            return Task.FromResult(role.Id.ToString());
        }

        public Task<string> GetRoleNameAsync(Role role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            return Task.FromResult(role.Name);
        }

        public Task SetRoleNameAsync(Role role, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            role.Name = roleName;

            return Task.CompletedTask;
        }

        public Task<string> GetNormalizedRoleNameAsync(Role role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            return Task.FromResult(role.Name);
        }

        public Task SetNormalizedRoleNameAsync(Role role, string normalizedName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            role.Name = normalizedName;

            return Task.CompletedTask;
        }

        public async Task<Role> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (int.TryParse(roleId, out int id))
            {
                return await _context.Roles.FindAsync(id);
            }
            else
            {
                return await Task.FromResult((Role)null);
            }
        }

        public async Task<Role> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            return await _context.Roles.SingleOrDefaultAsync(
                x => x.Name.Equals(normalizedRoleName), cancellationToken);
        }
    }
}
