using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Middlewares;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[PermissionAuthorize("Admin", "CanRead")]

    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;       
        private readonly ILogger<UserController> _logger;
        private readonly IRoleService _roleService;

        public UserController(ILogger<UserController> logger, IUserService userService, IRoleService roleService)
        {
            this._userService = userService;
            this._logger = logger;
            _roleService = roleService;
        }


        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] UserRegisterViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = ModelState.Values
                       .Where(v => v.Errors.Count > 0)
                       .ToDictionary(
                           k => k.Errors,
                           v => v.Errors.Select(e => e.ErrorMessage).ToList()
                       )
                    });
                }
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
                        success = false
                    });
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

        [HttpPost("get-users")]
        public IActionResult GetUsers()
        {
            try
            {
                List<UserWithRolesViewModel>? users = _userService.GetUsers()?.Result;
                return Ok(users);
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


        [HttpPost("verify-user")]
        public IActionResult VerifyEmail([FromBody] UserVerificationViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        errors = ModelState.Values
                       .Where(v => v.Errors.Count > 0)
                       .ToDictionary(
                           k => k.Errors,
                           v => v.Errors.Select(e => e.ErrorMessage).ToList()
                       )
                    });
                }
                var verificationResult = _userService.VerifyUser(model);

                if (verificationResult.Result.success)
                {
                    return Ok(new { success = true, message = verificationResult.Result.message });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = verificationResult.Result.message
                    });
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

        [HttpDelete("delete-user/{userId}")]
        public IActionResult DeleteUser(string userId)
        {
            try
            {
                var deletionResult = _userService.DeleteUser(userId);

                if (deletionResult.Result.success)
                {
                    return Ok(new { success = true, message = deletionResult.Result.message });
                }
                else
                {
                    return BadRequest(new { success = false, message = deletionResult.Result.message });
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

        [HttpPost("edit-user")]
        public IActionResult EditUser([FromBody] UserRegisterViewModel userData)
        {
            try
            {
                var updateResult = _userService.EditUser(userData);

                if (updateResult.Result.success)
                {
                    return Ok(new { success = true, message = updateResult.Result.message });
                }
                else
                {
                    return BadRequest(new { success = false, message = updateResult.Result.message });
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
    }
}
