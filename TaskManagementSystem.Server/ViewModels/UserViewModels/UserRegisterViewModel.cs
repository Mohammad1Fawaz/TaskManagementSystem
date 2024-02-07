using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserRegisterViewModel
    {
        [Required]
        public string companyName { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public string phoneNumber { get; set; }
    }

}
