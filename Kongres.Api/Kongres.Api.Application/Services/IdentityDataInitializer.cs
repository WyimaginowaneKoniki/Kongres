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

        public static async void SeedRoles(RoleManager<Role> roleManager)
        {
            if (!roleManager.RoleExistsAsync(UserType.Participant).Result)
            {
                var role = new Role { Name = UserType.Participant };
                await roleManager.CreateAsync(role);
            }


            if (!roleManager.RoleExistsAsync(UserType.Reviewer).Result)
            {
                var role = new Role { Name = UserType.Reviewer };
                await roleManager.CreateAsync(role);
            }
        }
    }
}
