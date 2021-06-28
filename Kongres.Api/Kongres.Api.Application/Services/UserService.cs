﻿using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using AutoMapper;
using Kongres.Api.Application.Commands.Users;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Domain.Extensions;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;

namespace Kongres.Api.Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IFileManager _fileManager;
        private readonly IEmailSender _emailSender;
        private readonly IJwtHandler _jwtHandler;
        private readonly IMemoryCache _cache;
        private readonly IMapper _mapper;

        public UserService(UserManager<User> userManager,
                            SignInManager<User> signInManager,
                            IJwtHandler jwtHandler,
                            IMemoryCache cache,
                            IScientificWorkRepository scientificWorkRepository,
                            IFileManager fileManager,
                            IEmailSender emailSender,
                            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtHandler = jwtHandler;
            _cache = cache;
            _scientificWorkRepository = scientificWorkRepository;
            _fileManager = fileManager;
            _emailSender = emailSender;
            _mapper = mapper;
        }

        public async Task<HeaderUserInfoDto> GetUserInfoForHeaderAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var scientificWork = await _scientificWorkRepository.GetByAuthorIdAsync(user.Id);

            var dto = _mapper.Map<HeaderUserInfoDto>(user);
            dto.PhotoBase64 = UserHelper.GetBase64Photo(_fileManager, user.Photo);
            dto.ScientificWorkId = scientificWork?.Id ?? 0;

            return dto;
        }

        public async Task RegisterAsync(UserTypeEnum userType, CreateUserCommand command)
        {
            var user = new User
            {
                Name = command.FirstName,
                UserName = UserHelper.GetUserName(userType, command.Email),
                Surname = command.LastName,
                Degree = command.AcademicTitle,
                Email = command.Email,
                Specialization = command.Specialization,
                University = command.University
            };

            // only participant have avatar
            if (userType == UserTypeEnum.Participant)
                user.Photo = await _fileManager.SaveFileAsync(command.Avatar);

            var createUserResult = await _userManager.CreateAsync(user, command.Password);

            if (createUserResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, userType.ToString());
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                await _emailSender.SendConfirmationEmailAsync(user.Id, user.Email, token);
            }
        }

        public async Task LoginAsync(UserTypeEnum userType, LoginUserCommand request)
        {
            var userName = UserHelper.GetUserName(userType, request.Email);

            var user = await _userManager.FindByNameAsync(userName);

            if (user is null)
                throw new Exception("Invalid credentials");

            var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, false);
            if (result.Succeeded)
            {
                // return login/JWT token
                var jwtToken = _jwtHandler.CreateToken(user.Id, userType.ToString());
                _cache.SetJwt(request.TokenId, jwtToken);
            }
        }

        public async Task<string> GetUserName(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            var isParticipant = await _userManager.IsInRoleAsync(user, nameof(UserTypeEnum.Participant));
            if (!isParticipant)
                throw new AuthenticationException();

            var scientificWork = await _scientificWorkRepository.GetByAuthorIdAsync(uint.Parse(userId));
            if (scientificWork != null)
                throw new InvalidOperationException();

            return UserHelper.GetFullName(user);
        }

        public async Task<MyProfileUserDto> GetInformationForMyProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            var scientificWork = await _scientificWorkRepository.GetByAuthorIdAsync(uint.Parse(userId));

            var dto = _mapper.Map<MyProfileUserDto>(user);
            dto.PhotoBase64 = UserHelper.GetBase64Photo(_fileManager, user.Photo);
            dto.WorkId = scientificWork?.Id ?? 0;

            return dto;
        }
    }
}
