using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserLoginViewModel
    {
        [Required(ErrorMessage = "Please enter your email address.")]
        [EmailAddress(ErrorMessage = "The email address you entered is invalid.")]
        public string email { get; set; }

        [Required(ErrorMessage = "A password is required.")]
        public string password { get; set; }
    }
}
