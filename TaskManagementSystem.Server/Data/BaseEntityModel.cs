using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.Data
{
    public abstract class  BaseEntityModel
    {
        [Key]
        public int id { get; set; }
        public int clientId { get; set; }
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
