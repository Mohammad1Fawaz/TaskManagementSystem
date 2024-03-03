using TaskManagementSystem.Server.Services;
using TaskManagementSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("add-task")]
        public async Task AddTask([FromBody] Task task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be Null")
            }

            try
            {
                return await _taskService.AddTask(task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("modify-task/{id}")]
        public async Task ModifyTask(string id, [FromBody] Task task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be Null")
            }

            try
            {
                return await _taskService.ModifyTask(id, task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("delete-task/{id}")]
        public IActionResult DeleteTask(string id)
        {
            try
            {
                _taskService.DeleteTask(id);
                return Ok("Task Deleted Successfully")
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("get-task/{id}")]
        public Task GetTask(string id)
        {
            try
            {
                return _taskService.GetTask(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("get-all-tasks")]
        public list<Task> GetAllTasks()
        {
            try
            {
                return _taskService.GetAllTasks();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}