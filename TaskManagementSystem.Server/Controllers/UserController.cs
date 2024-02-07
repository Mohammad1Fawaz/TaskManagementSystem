using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.Services;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserService _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger, AppDbContext context, UserService userService)
        {
            _logger = logger;
            _context = context;
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegisterViewModel model)
        {
            if (string.IsNullOrEmpty(model.companyName))
            {
                ModelState.AddModelError("UserName", "Please enter a username.");
            }

            if (string.IsNullOrEmpty(model.email))
            {
                ModelState.AddModelError("Email", "Please enter a valid email address.");
            }

            if (string.IsNullOrEmpty(model.password))
            {
                ModelState.AddModelError("Password", "Please enter a password.");
            }

            if (ModelState.IsValid)
            {
                var registrationResult = _userService.RegisterUser(model);

                if (registrationResult.Result.success)
                {
                    return Ok(new { success = true, message = registrationResult.Result.message });
                }
                else
                {
                    return BadRequest(new
                    {
                        message = registrationResult.Result.message,
                        existUser = true
                    });
                }
            }

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

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] UserResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var resetResult = _userService.ResetPassword(model);
                if (resetResult.Result.success)
                {
                    return Ok(new { success = true, message = resetResult.Result.message });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = resetResult.Result.success,
                        error = resetResult.Result.message
                    });
                }
            }
            else
            {
                var errorMessages = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { errors = errorMessages });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginViewModel model)
        {
            if (string.IsNullOrEmpty(model.email))
            {
                ModelState.AddModelError("Email", "Please enter a valid email address.");
            }

            if (string.IsNullOrEmpty(model.password))
            {
                ModelState.AddModelError("Password", "Please enter a password.");
            }

            if (ModelState.IsValid)
            {
                var registrationResult = _userService.LoginUser(model);

                if (registrationResult.success)
                {
                    return Ok(new { success = registrationResult.success, message = registrationResult.message, token = registrationResult.token });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = registrationResult.success,
                        error = registrationResult.message
                    });
                }
            }

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

        [HttpPost("verify-email")]
        public IActionResult VerifyEmail([FromBody] string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Invalid token");
            }

            var tokenValidationResult = _userService.ValidateToken(token);

            if (tokenValidationResult.isValid)
            {
                string email = _userService.GetEmailFromToken(token);
                if (!string.IsNullOrEmpty(email))
                {
                    Client? client = _context.Clients.FirstOrDefault(x => x.email == email);
                    if (client != null)
                    {
                        client.isUserVerfied = true;
                        _context.SaveChanges();
                        return Ok(new { success = true, message = $"Email: {email} verification successful. You can now log in.", token = tokenValidationResult.token });
                    }
                    else
                    {
                        return BadRequest(new
                        {
                            success = false,
                            message = "Something went wrong , please contact support",
                        });
                    }
                }
                else
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Something went wrong , please contact support",
                    });
                }
            }
            else
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid Token",
                });
            }
        }
    }
}
