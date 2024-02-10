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
        private readonly IServiceProvider _serviceProvider;
        private static readonly string _jwtSecret = "$#HJ#@KJ4z32&*#JKHSJKHSJKHJK#*(#JKsad";

        public UserService(AppDbContext context, IServiceProvider serviceProvider)
        {
            _context = context;
            _serviceProvider = serviceProvider;
        }

        public async Task<UserRegistrationResult> RegisterUser(UserRegisterViewModel model)
        {
            if (IsEmailTaken(model.email))
            {
                return new UserRegistrationResult(false, "Email is already registered.");
            }
            var hashedPassword = passwordProtection(model.password, "encrypt");

            var newClient = new Client
            {
                companyName = model.companyName,
                email = model.email,
                password = hashedPassword,
                phoneNumber = model.phoneNumber,
                isUserVerfied = false,
                token = ""
            };

            _context.Clients.Add(newClient);
            _context.SaveChanges();

            var verificationToken = GenerateJwtToken(newClient);

            newClient.token = verificationToken;
            _context.SaveChanges();

            string subject = "Verification Email";
            var verificationEndpoint = "https://localhost:5173/VerificationPage";
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $@"<p>Click the following link to verify your email: 
            <a href='{verificationEndpoint}?token={verificationToken}'>Verify Email</a></p>";
            var emailSender = _serviceProvider.GetRequiredService<IEmailSender>();
            await emailSender.SendEmailAsync(model.email, subject, bodyBuilder.HtmlBody);

            return new UserRegistrationResult(true, "Registration success. Please check your email for verification.");
        }


        public UserResultWithToken LoginUser(UserLoginViewModel model)
        {
            return CheckUserInfo(model.email, model.password);
        }

        public async Task<UserRegistrationResult> ResetPassword(UserResetPasswordViewModel model)
        {
            Client? user = _context.Clients.FirstOrDefault(u => u.email == model.email && u.phoneNumber == model.phoneNumber);
            if (user != null)
            {
                var password = passwordProtection(user.password, "decrypt");

                string subject = "Reset Password";
                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = $@"<p>{password}</p>";
                var emailSender = _serviceProvider.GetRequiredService<IEmailSender>();
                await emailSender.SendEmailAsync(model.email, subject, bodyBuilder.HtmlBody);

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
            var decryptedPassword = passwordProtection(user.password, "decrypt");

            if (user != null && decryptedPassword == password)
            {
                var jwtToken = GenerateJwtToken(user);
                user.token = jwtToken;
                _context.SaveChanges();

                return new UserResultWithToken(true, "Login Success", jwtToken);
            }
            else
            {
                return new UserResultWithToken(false, "Invalid Login, wrong email or password");
            }
        }
        private bool IsEmailTaken(string email)
        {
            return _context.Clients.Any(u => u.email == email);
        }

        private string GenerateJwtToken(Client client)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("userId", client.id.ToString()),
                    new Claim("companyName", client.companyName),
                    new Claim("userEmail", client.email),
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

        public string GetEmailFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            return jwtToken?.Claims.FirstOrDefault(c => c.Type == "userEmail")?.Value ?? "";
        }

        public string passwordProtection(string password, string type)
        {
            var passwordProtection = _serviceProvider.GetRequiredService<IEncryptionService>();
            if (type == "encrypt")
            {
                return passwordProtection.Encrypt(password);
            }
            else
            {
                return passwordProtection.Decrypt(password);
            }
        }
    }

}
