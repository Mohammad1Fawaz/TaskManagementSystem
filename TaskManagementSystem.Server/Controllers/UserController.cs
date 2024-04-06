using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;       
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            this._userService = userService;
            this._logger = logger;
        }


        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] UserRegisterViewModel model)
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
            var registrationResult = _userService.RegisterUser( model);

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
        [HttpPost("get-users")]
        public IActionResult GetUsers()
        {          
            List<UserWithRolesViewModel>? users = _userService.GetUsers()?.Result;
            return Ok(users);
        }



        [HttpPost("verify-user")]
        public IActionResult VerifyEmail([FromBody] UserVerificationViewModel model)
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

        [HttpDelete("delete-user/{userId}")]
        public IActionResult DeleteUser(string userId)
        {
            var deletionResult =  _userService.DeleteUser(userId);

            if (deletionResult.Result.success)
            {
                return Ok(new { success = true, message = deletionResult.Result.message });
            }
            else
            {
                return BadRequest(new { success = false, message = deletionResult.Result.message });
            }
        }
        [HttpPost("edit-user")]
        public IActionResult EditUser([FromBody] UserRegisterViewModel userData)
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
    }
}
