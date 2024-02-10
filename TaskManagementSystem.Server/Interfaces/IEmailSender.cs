namespace TaskManagementSystem.Server.Interfaces
{
    public interface IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message, bool hasNavbar = true, bool hasFooter = true);
    }
}
