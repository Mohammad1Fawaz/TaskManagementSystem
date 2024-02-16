using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class ClientResetPasswordViewModel
    {
        [Required(ErrorMessage = "Please provide your email address.")]
        [EmailAddress(ErrorMessage = "The email address format is invalid.")]
        public string email { get; set; }

        [Required(ErrorMessage = "Please provide your phone number.")]
        public string phoneNumber { get; set; }

        [Required(ErrorMessage = "Please select your country's phone code.")]
        public string phoneCode { get; set; }
    }
}
