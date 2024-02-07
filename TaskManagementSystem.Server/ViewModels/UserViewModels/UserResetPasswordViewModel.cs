using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserResetPasswordViewModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email")]
        public string email { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        public string phoneNumber { get; set; }
    }
}
