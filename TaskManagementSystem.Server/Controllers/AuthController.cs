using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Services;
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
      
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            try
            {
                var registrationResult = _authService.Logout();
                return Ok(new { success = registrationResult.Result.success, message = registrationResult.Result.message });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("get-user-info")]
        public async Task<IActionResult> GetRole()
        {
            try
            {
                UserDataViewModel userInfo = await _authService.GetUserInfo();
                return Ok(new { userInfo = userInfo });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
