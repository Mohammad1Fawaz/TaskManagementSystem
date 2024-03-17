using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class UserVerificationCode : BaseEntityModel
    {
        
        [ForeignKey(nameof(User))]
        public int UserId { get; set; } 

        public ApplicationUser User { get; set; } 

        public string VerificationCode { get; set; } 
    }
}
