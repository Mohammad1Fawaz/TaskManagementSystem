using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Services;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _clientService;
        private readonly ILogger<ClientController> _logger;

        public ClientController(ILogger<ClientController> logger, ClientService clientService)
        {
            _logger = logger;
            _clientService = clientService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] ClientRegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var registrationResult = _clientService.RegisterClient(model);

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
        public IActionResult ResetPassword([FromBody] ClientResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var resetResult = _clientService.ResetPassword(model);
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
        public IActionResult Login([FromBody] ClientLoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var registrationResult = _clientService.LoginClient(model);

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

            var tokenValidationResult = _clientService.ValidateToken(token);

            if (tokenValidationResult.isValid)
            {
                var verifyResult = _clientService.GetDataFromToken(token);
                if (verifyResult.success)
                {
                    return Ok(new { success = true, message = verifyResult.message, token = verifyResult.token });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = verifyResult.message,
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
