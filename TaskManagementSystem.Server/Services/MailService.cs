using TaskManagementSystem.Server.Interfaces;
using MimeKit;
using MailKit.Net.Smtp;
using System;
using System.Net;
using System.Threading.Tasks;

namespace TaskManagementSystem.Server.Services
{
    public class MailService : IEmailSender
    {
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("To Tasks Support", "mohammadfawaz261@gmail.com"));
            message.To.Add(new MailboxAddress("To email", email));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = htmlMessage;

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
