using Microsoft.AspNetCore.SignalR;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels.RealTimeViewModels;

namespace TaskManagementSystem.Server.RealTime
{
    public class NotificationHub : Hub
    {
        private readonly INotificationsService _notificationService;
        private readonly IValidationService _validationService;
        private readonly ConnectionManager _connectionManager;

        public NotificationHub(INotificationsService notificationService, IValidationService validationService, ConnectionManager connectionManager)
        {
            _notificationService = notificationService;
            _validationService = validationService;
            _connectionManager = connectionManager;
        }

        public override async Task OnConnectedAsync()
        {
            int userId = _validationService.GetAuthenticatedUserId();
            _connectionManager.AddConnection(userId.ToString(), Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _connectionManager.RemoveConnection(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task NotifyAllAsync(string message)
        {
            await _notificationService.NotifyAllAsync(message);
        }

        public async Task NotifyAsync(int receiverId, string message)
        {
            await _notificationService.NotifyAsync(receiverId,message);
        }

        public async Task<List<NotificationViewModel>> GetUnreadNotifications()
        {
            return await _notificationService.GetUnreadNotifications();
        }    

        public async Task MarkAllNotificationAsReadAsync()
        {
            await _notificationService.MarkAllNotificationAsReadAsync();
        }
    }
}
