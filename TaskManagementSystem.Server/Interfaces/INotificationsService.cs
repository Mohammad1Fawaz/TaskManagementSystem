using TaskManagementSystem.Server.ViewModels.RealTimeViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface INotificationsService
    {
        Task<List<NotificationViewModel>> GetUnreadNotifications();

        Task MarkNotificationAsReadAsync(int notificationId);

        Task MarkAllNotificationAsReadAsync();

        Task NotifyAsync(int receiverId, string content);

        Task NotifyAllAsync(string content);

        Task SendOnlineUsers(List<int> connectedUsersIds);

        List<int> GetOnlineUsers();
    }
}
