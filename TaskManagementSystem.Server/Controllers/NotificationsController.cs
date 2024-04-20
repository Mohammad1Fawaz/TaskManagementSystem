using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels.RealTimeViewModels;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationsService _notificationService;
        private readonly ILogger<UserController> _logger;

        public NotificationsController(ILogger<UserController> logger, INotificationsService notificationService)
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetGlobalUnreadNotifications()
        {
            try
            {
                List<NotificationViewModel> notifications = await _notificationService.GetUnreadNotifications();

                return Ok(notifications);
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
