using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        public readonly ITaskService _taskService;
        public TaskController(ITaskService taskService) { 
            _taskService = taskService;
        }

        [HttpPost("create-task")]
        public async Task<IActionResult> CreateTask([FromBody] BoardTaskViewModel task)
        {
            try
            {
                ProjectTask projectTask = await _taskService.CreateTask(task);
                return Ok(new { success = true, message = projectTask });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while creating task: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }

    }
}
