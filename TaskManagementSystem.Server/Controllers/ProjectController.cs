using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels.ClientViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        public readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost ("create-project")]
        public async Task<IActionResult> CreateProject(ProjectViewModel projectViewModel)
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
                var registrationResult = await _projectService.CreateProject(projectViewModel);

                if (registrationResult.success)
                {
                    return Ok(new { success = registrationResult.success, message = registrationResult.message });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = registrationResult.success,
                        message = registrationResult.message
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while creating project: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }
    }
}
