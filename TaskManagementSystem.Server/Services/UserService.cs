using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class UserService:IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _mailService;
        private readonly IValidationService _validationService;
        private readonly AppDbContext _dbContext;


        public UserService(AppDbContext dbContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender mailService, IValidationService validationService)
        {
            this._dbContext = dbContext;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._mailService = mailService;
            this._validationService = validationService;
        }

        public async Task<ResultViewModel> RegisterUser(UserRegisterViewModel model)
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            bool onlyNameDuplicate = false;
            string errorMessage = "";
            if (clientId == 0)
            {
                return new ResultViewModel(false, "You don't have permissions to add users");
            }
            var newUser = new ApplicationUser
            {
                UserName = model.name,
                Email = model.email,
                ClientId = clientId,
                PhoneNumber = model.phoneCode + " " + model.phoneNumber,
            };

            var userValidationResult = await _validationService.ValidateAsync(newUser);
            if (!userValidationResult.Succeeded)
            {
                errorMessage = string.Join(",", userValidationResult.Errors.Select(x => x.Description));
                return new ResultViewModel(userValidationResult.Succeeded, errorMessage);
            }

            var userCreationResult = await _userManager.CreateAsync(newUser, model.password);

            if (!userCreationResult.Succeeded)
            {
                if (userCreationResult.Errors.Any(x => x.Code == "DuplicateUserName") &&
                    userCreationResult.Errors.Count(x => x.Code != "DuplicateUserName") == 0)
                {
                    onlyNameDuplicate = true;
                    newUser.NormalizedEmail = model.email.ToUpper();
                    newUser.NormalizedUserName = model.name.ToUpper();
                    await _dbContext.Users.AddAsync(newUser);
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    errorMessage = string.Join(",", userCreationResult.Errors.Select(x => x.Description));
                    return new ResultViewModel(false, errorMessage);
                }

            }

            if (onlyNameDuplicate || userCreationResult.Succeeded)
            {
                string verificationCode = _validationService.GenerateUniqueVerificationCode(6);

                _validationService.StoreVerificationCode(newUser.Id, verificationCode);

                string verificationEndpoint = $"{Constants.url}/VerificationPage";
                string body = _mailService.getVerificationCodeEmailBody(verificationEndpoint, verificationCode, newUser.Id);
                await _mailService.SendEmailAsync(model.email, "VerificationEmail", body);


                foreach (int roleId in model.roles)
                {
                    await _dbContext.UserRoles.AddAsync(new IdentityUserRole<int>() { RoleId = roleId, UserId = newUser.Id });
                    await _dbContext.SaveChangesAsync();
                }

                return new ResultViewModel(true, "Registration success. Please check your email for verification.");
            }
            else
            {
                return new ResultViewModel(false, errorMessage);
            }
        }

        public async Task<List<ApplicationUser>> GetUsers()
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            if (clientId == 0)
            {
                return [];
            }
            List<ApplicationUser> users = await _dbContext.Users.Where(x => x.ClientId == clientId).ToListAsync();
            return users;
        }

        public async Task<ResultViewModel> VerifyUser(UserVerificationViewModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId.ToString());
            if (user == null)
            {
                return new ResultViewModel(false, "User not found");
            }

            var storedVerificationCode = _dbContext.UserVerificationCodes.FirstOrDefault(vc => vc.UserId == model.UserId);
            if (storedVerificationCode == null || user.Email != model.Email)
            {
                return new ResultViewModel(false, "Invalid Verification");
            }

            if (storedVerificationCode.VerificationCode != model.VerificationCode)
            {
                return new ResultViewModel(false, "Invalid verification code");
            }

            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);

            _dbContext.UserVerificationCodes.Remove(storedVerificationCode);
            await _dbContext.SaveChangesAsync();

            return new ResultViewModel(true, "User verified successfully");
        }


        public async Task<ResultViewModel> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ResultViewModel(false, "User not found");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                string errorMessage = string.Join(",", result.Errors.Select(x => x.Description));
                return new ResultViewModel(false, errorMessage);
            }

            return new ResultViewModel(true, "User deleted successfully");
        }
        public async Task<ResultViewModel> EditUser(UserRegisterViewModel userData)
        {
            var user = await _userManager.FindByEmailAsync(userData.email);
            if (user == null)
            {
                return new ResultViewModel(false, "User not found");
            }
            user.UserName = userData.name;
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                string errorMessage = string.Join(",", result.Errors.Select(x => x.Description));
                return new ResultViewModel(false, errorMessage);
            }

            return new ResultViewModel(true, "User Updated successfully");
        }


    }
}
