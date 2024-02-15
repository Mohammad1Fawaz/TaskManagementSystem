using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        private readonly EncryptionService _encryptionService;
        private readonly MailService _mailService;

        public UserService(AppDbContext context, EncryptionService encryptionService, MailService mailService)
        {
            _context = context;
            _encryptionService = encryptionService;
            _mailService = mailService;
        }
        public async Task<UserRegistrationResult> RegisterUser(UserRegisterViewModel model)
        {
            if (IsEmailTaken(model.email))
            {
                return new UserRegistrationResult(false, "Email is already registered.");
            }

            string verificationEndpoint = "https://localhost:5173/VerificationPage";
            string verificationToken = GenerateJwtTokenForRegistration(model);
            string subject = "Verification Email";
            string body = _mailService.getVerificationEmailBody(verificationEndpoint, verificationToken); 

            await _mailService.SendEmailAsync(model.email, subject, body, true, true);

            return new UserRegistrationResult(true, "Registration success. Please check your email for verification.");
        }
        public UserResultWithToken LoginUser(UserLoginViewModel model)
        {
            return CheckUserInfo(model.email, model.password);
        }
        public async Task<UserRegistrationResult> ResetPassword(UserResetPasswordViewModel model)
        {
            Client? client = _context.Clients.FirstOrDefault(u => u.email == model.email && u.phoneNumber == model.phoneCode + " " + model.phoneNumber);
            if (client != null)
            {
                string password = _encryptionService.Decrypt(client.password);

                string subject = "Password Reset Request";
                string body = _mailService.getResetPasswordEmailBody(password, client.email);

                await _mailService.SendEmailAsync(model.email, subject, body, true, true);

                return new UserRegistrationResult(true, "Verification succeeded. Please check your email.");
            }
            else
            {
                return new UserRegistrationResult(false, "User not found");
            }
        }
        private UserResultWithToken CheckUserInfo(string email, string password)
        {
            var user = _context.Clients.FirstOrDefault(u => u.email == email);
            if (user == null)
            {
                return new UserResultWithToken(false, "Login failed, wrong email or password");
            }
            else
            {
                var decryptedPassword = _encryptionService.Decrypt(user.password);
                if (decryptedPassword != password)
                {
                    return new UserResultWithToken(false, "Login failed, wrong email or password");
                }
                else
                {
                    var jwtToken = GenerateJwtTokenForLogin(user);
                    user.token = jwtToken;
                    _context.SaveChanges();

                    return new UserResultWithToken(true, "Login Success", jwtToken);
                }
            }
        }
        private bool IsEmailTaken(string email)
        {
            return _context.Clients.Any(u => u.email == email);
        }
        private string GenerateJwtTokenForRegistration(UserRegisterViewModel client)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(Constants._jwtSecret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("companyName", client.companyName),
                    new Claim("email", client.email),
                    new Claim("phoneNumber",client.phoneCode +" " + client.phoneNumber),
                    new Claim("password", _encryptionService.Encrypt(client.password)),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        private string GenerateJwtTokenForLogin(Client client)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(Constants._jwtSecret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("companyName", client.companyName),
                    new Claim("email", client.email),
                    new Claim("phoneNumber", client.phoneNumber),
                    new Claim("password", _encryptionService.Encrypt(client.password)),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        
        public UserTokenValidationResult ValidateToken(string token)
        {
            UserTokenValidationResult result = new UserTokenValidationResult();

            try
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                TokenValidationParameters validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants._jwtSecret)), 
                    ValidateIssuer = false, 
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero, 
                };

                SecurityToken validatedToken;
                result.claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken) as ClaimsPrincipal;
                result.isValid = true;
                result.token = token;
            }
            catch
            {
                result.isValid = false;
            }

            return result;
        }

        public UserResultWithToken GetDataFromToken(string token)
        {
            try
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken;
                JwtSecurityToken? jwtToken;

                if (tokenHandler.CanReadToken(token))
                {
                    securityToken = tokenHandler.ReadToken(token);
                    jwtToken = securityToken as JwtSecurityToken;

                    if (jwtToken == null)
                    {
                        return new UserResultWithToken(false, "Invalid token format");
                    }
                }
                else
                {
                    return new UserResultWithToken(false, "Unable to read token");
                }

                Claim? companyNameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "companyName");
                Claim? emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "email");
                Claim? phoneNumberClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "phoneNumber");
                Claim? passwordClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "password");

                if (companyNameClaim == null || emailClaim == null || phoneNumberClaim == null || passwordClaim == null)
                {
                    return new UserResultWithToken(false, "Token is missing required claims");
                }

                string companyName = companyNameClaim.Value;
                string email = emailClaim.Value;
                string phoneNumber = phoneNumberClaim.Value;
                string password = passwordClaim.Value;

                var client = new Client
                {
                    companyName = companyName,
                    email = email,
                    phoneNumber = phoneNumber,
                    password = password,
                    token = token
                };

                _context.Clients.Add(client);
                _context.SaveChanges();

                return new UserResultWithToken(true, $"Email: {client.email} verification successful.", token);
            }
            catch
            {
                return new UserResultWithToken(false, "Registration failed. Contact support");
            }
        }

    }

}
