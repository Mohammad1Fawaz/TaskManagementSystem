using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.ViewModels.ClientViewModels
{
    public class RoleData
    {
        [Required]
        public string RoleName { get; set; }
        [Required]
        public List<string> Permissions { get; set; }
    }
}
