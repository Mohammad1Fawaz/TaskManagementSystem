
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.Services;
using TaskManagementSystem.Server.ViewModels.ClientViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BoardController : ControllerBase
    {
        public readonly IBoardService _boardService;
        public BoardController(IBoardService boardService)
        {
            _boardService = boardService;
        }


        [HttpGet("get-project-workflow")]
        public async Task<IActionResult> GetProjectWorkFlow()
        {
            try
            {
                List<string> projectWorkFlow = await _boardService.GetProjectWorkFlow();

                return Ok(new { success = true, message = projectWorkFlow });
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

        [HttpGet("get-client-projects")]
        public async Task<IActionResult> GetClientProjects()
        {
            try
            {
                BoardViewModel boardViewModel = await _boardService.GetClientProjects();

                return Ok(new { success = true, message = boardViewModel });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while getting projects: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }

        [HttpGet("get-user-collaborators")]
        public async Task<IActionResult> GetAllUserCollaborators()
        {
            try
            {
                List<BoardProjectUsers> userCollaborators = await _boardService.GetAllUserCollaborators();
                return Ok(new { success = true, message = userCollaborators });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while getting projects: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }

        [HttpPut("update-task-status/{projectId}")]
        public async Task<IActionResult> UpdateTaskStatus([FromBody] UpdateTaskStatusRequest requestData , [FromRoute]  int projectId)
        {
            try
            {
                if (string.IsNullOrEmpty(requestData.newStatus) || string.IsNullOrEmpty(requestData.taskId))
                {
                    return BadRequest("Invalid request.");
                }

                var result = await _boardService.UpdateTaskStatusAsync(requestData.taskId, requestData.newStatus , projectId);
                if (!result)
                {
                    return NotFound("Task not found.");
                }

                return Ok("Task status updated successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error while getting projects: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }
    }
}
public class UpdateTaskStatusRequest
{
    public string taskId { get; set; }
    public string newStatus { get; set; }
}