using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementSystem.Server.Data
{
    public abstract class  BaseEntityModel
    {
        [Key]
        public int id { get; set; }
        [ForeignKey("user")]
        public int clientId { get; set; }
        public ApplicationUser user { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }

        public BaseEntityModel()
        {
            createdAt = DateTime.UtcNow;
            updatedAt = DateTime.UtcNow;
        }
        public void UpdateTimestamps()
        {
            updatedAt = DateTime.UtcNow;
        }
    }
}
