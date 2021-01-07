using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Kongres.Api.Application.Services
{
    public static class IdentityDataInitializer
    {
        public static void SeedData(RoleManager<Role> roleManager)
        {
            SeedRoles(roleManager);
        }

        private static void SeedRoles(RoleManager<Role> roleManager)
        {
            if (!roleManager.RoleExistsAsync(nameof(UserTypeEnum.Participant)).Result)
            {
                var role = new Role { Name = nameof(UserTypeEnum.Participant) };
                var result = roleManager.CreateAsync(role).Result;

                if (!result.Succeeded)
                {
                    // Log about error
                }
            }

            if (!roleManager.RoleExistsAsync(nameof(UserTypeEnum.Reviewer)).Result)
            {
                var role = new Role { Name = nameof(UserTypeEnum.Reviewer) };
                var result = roleManager.CreateAsync(role).Result;

                if (!result.Succeeded)
                {
                    // Log about error
                }
            }
        }
    }
}
