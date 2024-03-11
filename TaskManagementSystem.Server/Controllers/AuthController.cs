using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels.ClientViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly AppDbContext _dbContext;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger, AppDbContext dbContext, IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] ClientLoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "Login failed. Invalid Data.",
                    errors = ModelState.Values
                     .Where(v => v.Errors.Count > 0)
                     .ToDictionary(
                         k => k.Errors,
                         v => v.Errors.Select(e => e.ErrorMessage).ToList()
                     )
                });
            }
            var registrationResult = _authService.Login(model);

            if (registrationResult.Result.success)
            {
                return Ok(new { success = registrationResult.Result.success, message = registrationResult.Result.message, token = registrationResult.Result.token });
            }
            else
            {
                return BadRequest(new
                {
                    success = registrationResult.Result.success,
                    message = registrationResult.Result.message
                });
            }

        }

        [HttpPost("add-role")]
        public IActionResult AddRole([FromHeader(Name = "Authorization")] string token, [FromBody] RoleData roleData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        message = "Registration failed. Invalid data.",
                        errors = ModelState.Values
                           .Where(v => v.Errors.Count > 0)
                           .ToDictionary(
                               k => k.Errors,
                               v => v.Errors.Select(e => e.ErrorMessage).ToList()
                           )
                    });
                }
                var registrationResult = _authService.AddRole(token, roleData.RoleName, roleData.Permissions);

                if (registrationResult.Result.success)
                {
                    return Ok(new { success = registrationResult.Result.success, message = registrationResult.Result.message });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = registrationResult.Result.success,
                        message = registrationResult.Result.message
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("get-roles")]
        public IActionResult GetRoles([FromHeader(Name = "Authorization")] string token)
        {
            try
            {
                List<ApplicationRole>? roles = _authService.GetRoles(token)?.Result;
                return Ok(roles);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete-role/{roleId}")]
        public IActionResult DeleteRole([FromHeader(Name = "Authorization")] string token, string roleId)
        {
            try
            {
                var registrationResult = _authService.DeleteRole(token, roleId);

                if (registrationResult.Result.success)
                {
                    return Ok(new { success = registrationResult.Result.success, message = registrationResult.Result.message });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = registrationResult.Result.success,
                        message = registrationResult.Result.message
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpPost("get-role-permissions")]
        public IActionResult GetRolesPermissions([FromHeader(Name = "Authorization")] string token)
        {
            try
            {
                List<IdentityRoleClaim<int>>? claims = _authService.GetRolesPermission(token)?.Result;
                return Ok(claims);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("get-role")]
        public IActionResult GetRole([FromHeader(Name = "Authorization")] string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
                {
                    return Unauthorized();
                }

                string jwtToken = token.Substring("Bearer ".Length).Trim();

                var handler = new JwtSecurityTokenHandler();
                var claims = handler.ReadJwtToken(jwtToken).Claims;

                string? role = claims?.FirstOrDefault(c => c.Type == "role")?.Value;
                if (string.IsNullOrEmpty(role))
                {
                    return Unauthorized();
                }

                return Ok(new { role = role });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
