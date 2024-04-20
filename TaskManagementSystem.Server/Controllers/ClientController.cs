using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly ILogger<ClientController> _logger;

        public ClientController(ILogger<ClientController> logger, IClientService clientService)
        {
            _logger = logger;
            _clientService = clientService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] ClientRegisterViewModel model)
        {
            try
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
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ClientResetPasswordViewModel model)
        {
            try
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
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }


        [HttpPost("verify-email")]
        public IActionResult VerifyEmail([FromBody] VerificationEmailViewModel model)
        {
            try
            {
                var verifyResult = _clientService.VerifyEmail(model.token, model.email);

                if (!verifyResult.Result.success)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = verifyResult.Result.message,
                    });
                }
                return Ok(new { success = true, message = verifyResult.Result.message, token = verifyResult.Result.token });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }
    }
}
