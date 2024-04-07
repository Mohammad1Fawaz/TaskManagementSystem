using Microsoft.AspNetCore.Identity;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class ClientService : IClientService
    {
        private readonly AppDbContext _context;
        private readonly IEmailSender _mailService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        public ClientService(AppDbContext context,IEmailSender mailService, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _context = context;
            _mailService = mailService;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task<ResultViewModel> RegisterClient(ClientRegisterViewModel model)
        {
            if (await _userManager.FindByEmailAsync(model.email) != null)
            {
                return new ResultViewModel(false, "Email is already registered.");
            }

            string companyName = model.companyName;
            string email = model.email;
            string phoneNumber = model.phoneCode + " " + model.phoneNumber;
            string password = model.password;

            var client = new ApplicationUser
            {
                UserName = companyName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = false,
            };

            var result = await _userManager.CreateAsync(client, password);
            if (!result.Succeeded)
            {
                return new ResultViewModel(false, "Something went wrong error code:HS12JS3.");
            }

            client.ClientId = client.Id;
            string verificationToken = await _userManager.GenerateEmailConfirmationTokenAsync(client);
            string verificationEndpoint = $"{ConstantStrings.url}/ClientVerificationPage";
            string subject = "Verification Email";
            string body = _mailService.getVerificationEmailBody(verificationEndpoint, verificationToken, email);

            await _mailService.SendEmailAsync(model.email, subject, body, true, true);

            if (!await _roleManager.RoleExistsAsync("ClientAdmin"))
            {
                var roleResult = await _roleManager.CreateAsync(new ApplicationRole() { UserId = client.Id, Name = "ClientAdmin", ApplicationUser = client });
                if (!roleResult.Succeeded)
                {
                    return new ResultViewModel(false, "Failed to create 'ClientAdmin' role.");
                }
            }
            await _userManager.AddToRoleAsync(client, "ClientAdmin");
            var userToken = new IdentityUserToken<int>
            {
                UserId = client.Id,
                LoginProvider = _userManager.Options.Tokens.EmailConfirmationTokenProvider,
                Name = _userManager.Options.Tokens.EmailConfirmationTokenProvider,
                Value = verificationToken
            };

            _context.UserTokens.Add(userToken);

            await _context.SaveChangesAsync();

            return new ResultViewModel(true, "Registration success. Please check your email for verification.");
        }


        public async Task<ResultViewModel> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ResultViewModel(false, "user not found.");
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return new ResultViewModel(true, "email verified successfully. user logged in.");
            }
            else
            {
                return new ResultViewModel(false, "failed to verify email.");
            }
        }


        public async Task<ResultViewModel> ResetPassword(ClientResetPasswordViewModel model)
        {
            ApplicationUser? client = await _userManager.FindByEmailAsync(model.email);
            if (client != null)
            {
                string password = client.PasswordHash;

                string subject = "Password Reset Request";
                if (string.IsNullOrEmpty(client.Email))
                {
                    return new ResultViewModel(false, "Invalid Email");
                }
                string body = _mailService.getResetPasswordEmailBody(password, client.Email);
                await _mailService.SendEmailAsync(model.email, subject, body, true, true);
                return new ResultViewModel(true, "Verification succeeded. Please check your email.");
            }
            else
            {
                return new ResultViewModel(false, "User not found");
            }
        }
     
    }

}
