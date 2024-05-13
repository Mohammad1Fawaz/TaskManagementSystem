using System.ComponentModel.DataAnnotations;
using TaskManagementSystem.Server.Attributes;
using TaskManagementSystem.Server.Models;

namespace TaskManagementSystem.Server.ViewModels.ClientViewModels
{
    public class ProjectViewModel
    {
        [Required]
        public string projectName { get; set; }
        [Required]

        public string projectKey { get; set; }
        [Required]

        public string projectDescription { get; set; }
        [Required(ErrorMessage = "The project Leader field is required.")]
        [NotZero(ErrorMessage = "The project Lead field is required..")]
        public int projectLead { get; set; }
        [Required]

        public List<int> userIds { get; set; }
        [Required]
        public List<string> projectWorkFlow { get; set; }
    }
}
