namespace TaskManagementSystem.Server.ViewModels.RealTimeViewModels
{
    public class NotificationViewModel
    {
        public int id { get; set; }

        public string? sender { get; set; }

        public string? receiver { get; set; }

        public string? content { get; set; }

        public bool isRead { get; set; }

        public string? type { get; set; }
    }
}
