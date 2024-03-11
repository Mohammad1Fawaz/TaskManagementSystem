namespace TaskManagementSystem.Server.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message, bool hasNavbar = true, bool hasFooter = true);

        string getHeader(string logo);
        string getFooter();
        string getVerificationEmailBody(string verificationEndpoint, string verificationToken, string email);

        string getResetPasswordEmailBody(string password, string email);

        string getVerificationCodeEmailBody(string verificationEndpoint, string VerificationCode, int id);

        string getForgotPasswordEmailBody(string password, string email);
    }
}
