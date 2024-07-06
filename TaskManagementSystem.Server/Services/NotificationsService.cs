using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.RealTime;
using TaskManagementSystem.Server.ViewModels.RealTimeViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class NotificationsService : INotificationsService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _mailService;
        private readonly IValidationService _validationService;
        private readonly IRoleService _roleService;
        private readonly AppDbContext _dbContext;
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ConnectionManager _connectionManager;
        
        public NotificationsService(AppDbContext dbContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender mailService, IValidationService validationService, IRoleService roleService, IHubContext<NotificationHub> hubContext, ConnectionManager connectionManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _mailService = mailService;
            _validationService = validationService;
            _roleService = roleService;
            _hubContext = hubContext;
            _connectionManager = connectionManager;
        }     

        public async Task<List<NotificationViewModel>> GetUnreadNotifications()
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            int userId = _validationService.GetAuthenticatedUserId();

            List<NotificationViewModel> notifications = await _dbContext.Notifications
                .Where(x => x.clientId == clientId && ( x.userReceiverId == userId || x.forAll))
                .Select(n => new NotificationViewModel
                {
                    id = n.id,
                    sender = _dbContext.Users.Where(u => u.Id == n.userSenderId).Select(u => u.UserName).FirstOrDefault(),
                    receiver = _dbContext.Users.Where(u => u.Id == n.userReceiverId).Select(u => u.UserName).FirstOrDefault(),
                    content = n.content,
                    type = n.type.ToString(),
                    isRead = n.isRead
                })
                .ToListAsync();

            return notifications;
        }

        public async Task MarkNotificationAsReadAsync(int notificationId)
        {
            var notification = await _dbContext.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.isRead = true;
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task MarkAllNotificationAsReadAsync()
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            var notifications = await _dbContext.Notifications.Where(x=> x.clientId == clientId).ToListAsync();
            notifications.ForEach(x => x.isRead = true);

            await _dbContext.SaveChangesAsync();
        }

        public async Task NotifyAsync(int receiverId, string content)
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            int senderId = _validationService.GetAuthenticatedUserId();
            var notification = new Notification
            {
                content = content,
                clientId = clientId,
                userSenderId = senderId,
                forAll = false,
                userReceiverId = receiverId,
                createdAt = DateTime.Now,
                isRead = false
            };

            _dbContext.Notifications.Add(notification);
            await _dbContext.SaveChangesAsync();


            List<string> receiverConnections = _connectionManager.GetConnections(receiverId);

            foreach (var connectionId in receiverConnections)
            {
                await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveNotification", notification);
            }
        }

        public async Task NotifyAllAsync(string content)
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            int senderId = _validationService.GetAuthenticatedUserId();
            var notification = new Notification
            {
                content = content,
                userSenderId = senderId,
                forAll = true,
                clientId = clientId,
                createdAt = DateTime.Now,
                isRead = false
            };

            _dbContext.Notifications.Add(notification);
            await _dbContext.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("receiveNotification", notification);
        }

        public async Task SendOnlineUsers(List<int> connectedUsersIds)
        {
            await _hubContext.Clients.All.SendAsync("newOnlineUser", connectedUsersIds);
        }

        public List<int> GetOnlineUsers() 
        {
            return _connectionManager.GetAllUserIdsWithConnections().ToList();
        }
    }
}
