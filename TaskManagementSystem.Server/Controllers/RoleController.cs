using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels.ClientViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoleController : ControllerBase
    {

        private readonly IRoleService _roleService;
        private readonly ILogger<AuthController> _logger;

        public RoleController(ILogger<AuthController> logger,IRoleService roleService)
        {
            _logger = logger;
            _roleService = roleService;
        }


        [HttpPost("add-role")]
        public IActionResult AddRole([FromBody] RoleData roleData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        message = "Addition failed. Invalid data.",
                        errors = ModelState.Values
                           .Where(v => v.Errors.Count > 0)
                           .ToDictionary(
                               k => k.Errors,
                               v => v.Errors.Select(e => e.ErrorMessage).ToList()
                           )
                    });
                }
                var registrationResult = _roleService.AddRole(roleData.RoleName, roleData.Permissions);

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
        public IActionResult GetRoles()
        {
            try
            {
                List<ApplicationRole>? roles = _roleService.GetAllCreatedRoles()?.Result;
                return Ok(roles);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete-role/{roleId}")]
        public IActionResult DeleteRole(string roleId)
        {
            try
            {
                var registrationResult = _roleService.DeleteRole(roleId);

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

        [HttpPut("edit-role/{roleId}")]
        public IActionResult EditRole(string roleId , List<string> claims)
        {
            try
            {
                var registrationResult = _roleService.EditRole(roleId, claims);

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
        public IActionResult GetRolesPermissions()
        {
            try
            {
                List<IdentityRoleClaim<int>>? claims = _roleService.GetRolesPermission()?.Result;
                return Ok(claims);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("get-role")]
        public IActionResult GetRole()
        {
            try
            {
                string role = _roleService.GetUserRole();
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
