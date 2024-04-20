using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskManagementSystem.Server.Common;

namespace TaskManagementSystem.Server.Middlewares
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _jwtSecretKey = ConstantStrings._jwtSecret;

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

                            if (!string.IsNullOrEmpty(userId))
                            {
                                context.Session.SetString("userId", userId);
                            }
                            if (!string.IsNullOrEmpty(clientId))
                            {
                                context.Session.SetString("clientId", clientId);
                            }
                            if (!string.IsNullOrEmpty(role))
                            {
                                context.Session.SetString("role", role);
                            }
                        }
                        else
                        {
                            context.Response.StatusCode = 401;
                            return;
                        }
                    }

                    context.Items["isAuthenticated"] = isAuthenticated;

                    if (!string.IsNullOrEmpty(userId))
                    {
                        context.Items["userId"] = userId;
                    }
                    if (!string.IsNullOrEmpty(clientId))
                    {
                        context.Items["clientId"] = clientId;
                    }
                    if (!string.IsNullOrEmpty(role))
                    {
                        context.Items["role"] = role;
                    }
                }
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
                var clientId = jwtToken.Claims.First(x => x.Type == "clientId").Value;

                return (userId, clientId, role, true);
            }
            catch (SecurityTokenException ex)
            {
                throw new UnauthorizedAccessException("Invalid authorization token", ex);
            }
            catch (Exception ex)
            {
                throw new SecurityTokenException("Token validation failed", ex);
            }
        }

    }
}
