﻿using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using MailKit;
using TaskManagementSystem.Server.Interfaces;
using MimeKit;

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
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.password);
            var newUser = new User
            {
                userName = model.userName,
                email = model.email,
                password = hashedPassword,
                isUserVerfied = false,
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            var verificationToken = GenerateJwtToken(newUser);

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

        private UserResultWithToken CheckUserInfo(string email, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.email == email);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.password))
            {
                var jwtToken = GenerateJwtToken(user);

                return new UserResultWithToken(true, "Login Success", jwtToken);
            }
            else
            {
                return new UserResultWithToken(false, "Invalid Login, wrong email or password", null);
            }
        }
        private bool IsEmailTaken(string email)
        {
            return _context.Users.Any(u => u.email == email);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("userId", user.id.ToString()),
                    new Claim("UserName", user.userName),
                    new Claim("userEmail", user.email),
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
                result.ClaimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken) as ClaimsPrincipal;
                result.IsValid = true;
                result.Token = token;
            }
            catch (Exception ex)
            {
                result.IsValid = false;
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


    }

}
