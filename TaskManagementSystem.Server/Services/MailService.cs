using MailKit.Net.Smtp;
using MimeKit;
using TaskManagementSystem.Server.Interfaces;

namespace TaskManagementSystem.Server.Services
{
    public class MailService : IEmailSender
    {
        public string getHeader(string logo)
        {
            return $@"
            <div style=""font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"">
            <div style='background-color: #333; color: white; padding: 10px; text-align: center;'>
                <img src={logo} alt='Logo' style='height: 50px; object-fit:contain;' />
            </div>";
        }

        public string getFooter()
        {
            return @"
            <footer style='background-color: #333; color: white; padding: 10px; text-align: center;'>
                <p style=""font-size: 14px; color: #fff;"">This is an automated message. Please do not reply to this email as responses are not monitored.</p>
            </footer></div>";
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage, bool hasHeader = true, bool hasFooter = true)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("To Tasks Support", "mohammadfawaz261@gmail.com"));
            message.To.Add(new MailboxAddress("To email", email));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder();

            if (hasHeader)
            {
                bodyBuilder.HtmlBody += getHeader("https://i.im.ge/2024/02/10/cjY88M.TaskManagementLogo.png");
            }

            bodyBuilder.HtmlBody += htmlMessage;

            if (hasFooter)
            {
                bodyBuilder.HtmlBody += getFooter();
            }

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate("mohammadfawaz261@gmail.com", "zkrqwadesrukuual");
                await client.SendAsync(message);
                client.Disconnect(true);
            }
        }
    }
}
