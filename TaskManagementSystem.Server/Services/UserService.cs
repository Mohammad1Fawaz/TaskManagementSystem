using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        private readonly IEncryptionService _encryptionService;
        private readonly IEmailSender _emailSender;
        private static readonly string _jwtSecret = "$#HJ#@KJ4z32&*#JKHSJKHSJKHJK#*(#JKsad";

        public UserService(AppDbContext context, IEncryptionService encryptionService, IEmailSender mailSender)
        {
            _context = context;
            _encryptionService = encryptionService;
            _emailSender = mailSender;
        }
        public async Task<UserRegistrationResult> RegisterUser(UserRegisterViewModel model)
        {
            if (IsEmailTaken(model.email))
            {
                return new UserRegistrationResult(false, "Email is already registered.");
            }

            var verificationEndpoint = "https://localhost:5173/VerificationPage";
            var verificationToken = GenerateJwtTokenForRegistration(model);
            var subject = "Verification Email";
            var body = $@"<p style='font-family: Arial, sans-serif; text-align: center; font-size: 18px; color: #333;'>Click the following link to verify your email:</p>
            <div style='width: 100%; text-align: center; margin: auto;'><a href='{verificationEndpoint}?token={verificationToken}' style='font-family: Arial, sans-serif; font-size: 16px; color: #007bff; text-decoration: underline;'>Verify Email</a></div>";

            await _emailSender.SendEmailAsync(model.email, subject, body, true, true);

            return new UserRegistrationResult(true, "Registration success. Please check your email for verification.");
        }
        public UserResultWithToken LoginUser(UserLoginViewModel model)
        {
            return CheckUserInfo(model.email, model.password);
        }
        public async Task<UserRegistrationResult> ResetPassword(UserResetPasswordViewModel model)
        {
            Client? client = _context.Clients.FirstOrDefault(u => u.email == model.email && u.phoneNumber == model.phoneNumber);
            if (client != null)
            {
                var password = _encryptionService.Decrypt(client.password);

                string subject = "Password Reset Request";
                var body = $@"<div style=""color: #000""><p>We have received a request to reset your password associated with this email address {client.email}.
                            as requested. </p><p>Here is your password: {password}</p>
                            <p>For your security, we recommend changing this password immediately after logging in</p>
                            <p>If you did not request a password reset,
                            or if you believe you have received this email in error, please ignore this message. However,
                            if you are concerned about unauthorized access to your account, we recommend that you
                            log into your account as soon as possible to change your password or contact our support team.</p>
                            <p>Thank you for using <strong>ToTask</strong>.</p>
                            <p>Best Regards,<br>ToTask<br>Support: <a href=""mailto:totask@gmail.com"" style=""text-decoration: none;"">totask@gmail.com</a></p></div>";

                await _emailSender.SendEmailAsync(model.email, subject, body, true, true);

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
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
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

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        private string GenerateJwtTokenForLogin(Client client)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
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

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        //public class TokenValidationResult
        //{
        //    public bool IsValid { get; set; }
        //    public ClaimsPrincipal? ClaimsPrincipal { get; set; }
        //}
        public UserTokenValidationResult ValidateToken(string token)
        {
            var result = new UserTokenValidationResult();

            try
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret)), // Use the correct conversion here
                    ValidateIssuer = false, // Set to true if you have an issuer
                    ValidateAudience = false, // Set to true if you have an audience
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero, // Adjust as needed
                };

                SecurityToken validatedToken;
                result.claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken) as ClaimsPrincipal;
                result.isValid = true;
                result.token = token;
            }
            catch (Exception ex)
            {
                result.isValid = false;
            }

            return result;
        }
        //public string GetUserNameFromToken(string token)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

        //    return jwtToken?.Claims.FirstOrDefault(c => c.Type == "UserName")?.Value;
        //}
        public UserResultWithToken GetDataFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            var userData = new UserRegisterViewModel
            {
                companyName = jwtToken.Claims.FirstOrDefault(c => c.Type == "companyName")?.Value,
                email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value,
                phoneNumber = jwtToken.Claims.FirstOrDefault(c => c.Type == "phoneNumber")?.Value,
                password = jwtToken.Claims.FirstOrDefault(c => c.Type == "password")?.Value
            };

            try
            {
                Client client = new Client
                {
                    companyName = userData.companyName,
                    email = userData.email,
                    phoneNumber = userData.phoneNumber,
                    password = userData.password,
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
