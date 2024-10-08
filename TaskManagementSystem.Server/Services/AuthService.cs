﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels.CommonViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IValidationService _validationService;
        private readonly IRoleService _roleService;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IValidationService validationService, IRoleService roleService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _validationService = validationService;
            _roleService = roleService;
        }

        public async Task<ResultViewModel> Login(ClientLoginViewModel model)
        {
            string email = model.email;
            string password = model.password;
            model.rememberMe = true;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ResultViewModel(false, "Login failed, wrong email or password");
            }

            var result = await _signInManager.PasswordSignInAsync(user, password, model.rememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                if (!user.EmailConfirmed)
                {
                    return new ResultViewModel(false, "Login failed, email not confirmed.");
                }
                bool isClient = user.ClientId == user.Id ? true : false;
                string token = GenerateJwtToken(user , isClient);
                return new ResultViewModel(true, "Login successful",token);
            }
            else
            {
                return new ResultViewModel(false, "Login failed, wrong email or password");
            }
        }

        public string GenerateJwtToken(ApplicationUser client, bool isClient = false)
        {
            if (client != null)
            {
                string email = client.Email ?? "";
                string phoneNumber = client.PhoneNumber ?? "";

                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                byte[] key = Encoding.ASCII.GetBytes(ConstantStrings._jwtSecret);
                SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                new Claim(ClaimTypes.Role, isClient ? "ClientAdmin" : "User"),
                new Claim(ClaimTypes.NameIdentifier, client.Id.ToString()),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.MobilePhone, phoneNumber),
                new Claim("clientId", client.ClientId.ToString() ?? "")
            }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            return "";
        }


        public async Task<ResultViewModel> Logout()
        {
            await _signInManager.SignOutAsync();

            _validationService.ClearSession();

            return new ResultViewModel(true, "Logout successful");
        }

        public async Task<UserDataViewModel> GetUserInfo()
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            var client = await _userManager.FindByIdAsync(clientId.ToString());
            string? role = _validationService.GetUserRole();

            UserDataViewModel clientData = new UserDataViewModel()
            {
                id = client?.Id,
                userName = client?.UserName,
                email = client?.Email,
                phoneNumber = client?.PhoneNumber,
                role = role
            };
            return clientData;
        }

        public async Task<bool> AuthorizeElement(List<string> requiredClaims)
        {
            int userId = _validationService.GetAuthenticatedUserId();
            var userClaims = await _roleService.GetUserClaimsByUserIdAsync(userId);

            bool isAuthorized = requiredClaims.All(claim => userClaims.Contains(claim));

            return isAuthorized;
        }

    }
}
