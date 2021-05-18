﻿using Kongres.Api.Domain.Entities;
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

        private static async void SeedRoles(RoleManager<Role> roleManager)
        {
            var participantExists = await roleManager.RoleExistsAsync(nameof(UserTypeEnum.Participant));
            if (!participantExists)
            {
                var role = new Role { Name = nameof(UserTypeEnum.Participant) };
                await roleManager.CreateAsync(role);
            }

            var reviewerExists = await roleManager.RoleExistsAsync(nameof(UserTypeEnum.Reviewer));
            if (!reviewerExists)
            {
                var role = new Role { Name = nameof(UserTypeEnum.Reviewer) };
                await roleManager.CreateAsync(role);
            }
        }
    }
}
