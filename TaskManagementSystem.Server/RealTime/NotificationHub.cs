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
            string connectionId = Context.ConnectionId;
            if (!_connectionManager.ConnectionExists(userId, connectionId))
            {
                _connectionManager.AddConnection(userId, connectionId);
                List<int> onlineUserIds = _connectionManager.GetAllUserIdsWithConnections();
                await _notificationService.SendOnlineUsers(onlineUserIds);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            int userId = _validationService.GetAuthenticatedUserId();

            if (userId != 0)
            {
                _connectionManager.RemoveConnection(userId, Context.ConnectionId);
                List<int> onlineUserIds = _connectionManager.GetAllUserIdsWithConnections();
                await _notificationService.SendOnlineUsers(onlineUserIds);
            }

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

        public List<int> GetOnlineUsers()
        {
            var onlineUserIds = _connectionManager.GetAllUserIdsWithConnections();

            return onlineUserIds.ToList();
        }
    }
}
