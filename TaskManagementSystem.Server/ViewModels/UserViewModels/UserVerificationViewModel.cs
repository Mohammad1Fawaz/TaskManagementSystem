using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserVerificationViewModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string VerificationCode { get; set; }
    }
}
