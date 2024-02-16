using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class ClientRegisterViewModel
    {
        [Required(ErrorMessage = "Please provide the name of your company.")]
        public string companyName { get; set; }

        [Required(ErrorMessage = "Please enter your email address.")]
        [EmailAddress(ErrorMessage = "The email address you entered is invalid.")]
        public string email { get; set; }

        [Required(ErrorMessage = "A password is required.")]
        [MinLength(8, ErrorMessage = "The password must be at least 8 characters long.")]
        public string password { get; set; }

        [Required(ErrorMessage = "Please enter your phone number.")]
        public string phoneNumber { get; set; }

        [Required(ErrorMessage = "Please select your country's phone code.")]
        public string phoneCode { get; set; }
    }
}
