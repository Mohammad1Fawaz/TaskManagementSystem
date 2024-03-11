using MailKit.Net.Smtp;
using MimeKit;
using System.Web;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;

namespace TaskManagementSystem.Server.Services
{
    public class MailService : IEmailSender
    {
       
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



        public string getHeader(string logo)
        {
            return $@"
            <div style=""font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"">
            <div style='background-color: #333; color: white; padding: 10px; text-align: center;'>
                <img src={logo} alt='Logo' style='height: 60px; object-fit:contain;' />
            </div>";
        }

        public string getFooter()
        {
            return @"
            <footer style='background-color: #333; color: white; padding: 10px; text-align: center;'>
                <p style=""font-size: 14px; color: #fff;"">This is an automated message. Please do not reply to this email as responses are not monitored.</p>
            </footer></div>";
        }

        public string getVerificationEmailBody(string verificationEndpoint, string verificationToken , string email)
        {
            string encodedToken = HttpUtility.UrlEncode(verificationToken);
            string encodedEmail = HttpUtility.UrlEncode(email);
            return $@"<p style='font-family: Arial, sans-serif; text-align: center; font-size: 18px; color: #333;'>Click the following link to verify your email:</p>
            <div style='width: 100%; text-align: center; margin: auto;'><a href='{verificationEndpoint}?token={encodedToken}&email={encodedEmail}' style='font-family: Arial, sans-serif; font-size: 16px; color: #007bff; text-decoration: underline;'>Verify Email</a></div>";
        }

        public string getResetPasswordEmailBody(string password, string email)
        {
            return 
                $@"<div style=""color: #000""><p>We have received a request to reset your password associated with this email address {email}.
                            as requested. </p><p>Here is your password: {password}</p>
                            <p>For your security, we recommend changing this password immediately after logging in</p>
                            <p>If you did not request a password reset,
                            or if you believe you have received this email in error, please ignore this message. However,
                            if you are concerned about unauthorized access to your account, we recommend that you
                            log into your account as soon as possible to change your password or contact our support team.</p>
                            <p>Thank you for using <strong>ToTask</strong>.</p>
                            <p>Best Regards,<br>ToTask<br>Support: <a href=""mailto:totask@gmail.com"" style=""text-decoration: none;"">totask@gmail.com</a></p>
                </div>";
        }

        public string getVerificationCodeEmailBody(string verificationEndpoint, string VerificationCode , int id)
        {
            return $@"<p style='font-family: Arial, sans-serif; text-align: center; font-size: 18px; color: #333;'>Click this button to verify your email with verification code : {VerificationCode}</p>
            <div style='width: 100%; text-align: center; margin: auto;'><a href='{verificationEndpoint}??code={VerificationCode}&userId={id}' style='font-family: Arial, sans-serif; font-size: 16px; color: #007bff; text-decoration: underline;'>Verify Email</a></div>";
        }

        public string getForgotPasswordEmailBody(string password, string email)
        {
            return
                $@"<div style=""color: #000""><p>We have received a request to reset your password associated with this email address {email}.
                            as requested. </p><p>Here is your password: {password}</p>
                            <p>For your security, we recommend changing this password immediately after logging in</p>
                            <p>If you did not request a password reset,
                            or if you believe you have received this email in error, please ignore this message. However,
                            if you are concerned about unauthorized access to your account, we recommend that you
                            log into your account as soon as possible to change your password or contact our support team.</p>
                            <p>Thank you for using <strong>ToTask</strong>.</p>
                            <p>Best Regards,<br>ToTask<br>Support: <a href=""mailto:totask@gmail.com"" style=""text-decoration: none;"">totask@gmail.com</a></p>
                </div>";
        }
    }
}
