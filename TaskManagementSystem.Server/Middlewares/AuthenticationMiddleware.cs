using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using TaskManagementSystem.Server.Common;

namespace TaskManagementSystem.Server.Middlewares
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _jwtSecretKey = Constants._jwtSecret;

        public AuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var isAuthenticated = false;
            var userId = "";
            var clientId = "";
            var role = "";

            try
            {
                if (context.Request.Headers.ContainsKey("Authorization"))
                {
                    var authorizationHeader = context.Request.Headers["Authorization"].ToString();

                    if (authorizationHeader.StartsWith("Bearer "))
                    {
                        var token = authorizationHeader.Substring("Bearer ".Length).Trim();
                        var (parsedUserId, parsedClientId, parsedRole, isValid) = ParseJwtToken(token);
                        if (isValid)
                        {
                            userId = parsedUserId;
                            clientId = parsedClientId;
                            role = parsedRole;
                            isAuthenticated = true;

                            context.Session.SetString("UserId", userId);
                            context.Session.SetString("ClientId", clientId);
                            context.Session.SetString("Role", role);
                        }
                        else
                        {
                            context.Response.StatusCode = 401;
                            return;
                        }
                    }
                }

                context.Items["IsAuthenticated"] = isAuthenticated;
                context.Items["UserId"] = userId;
                context.Items["ClientId"] = clientId;
                context.Items["Role"] = role;

                await _next(context);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                context.Response.StatusCode = 500;
                return;
            }
        }

        private (string, string, string, bool) ParseJwtToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Authorization token is missing");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecretKey);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "nameid").Value;
                var role = jwtToken.Claims.First(x => x.Type == "role").Value;
                var clientId = role == "ClientAdmin" ? userId : jwtToken.Claims.First(x => x.Type == "clientId").Value;

                return (userId, clientId, role, true);
            }
            catch (Exception ex)
            {
                throw new SecurityTokenException("Token validation failed", ex);
            }
        }
    }
}
