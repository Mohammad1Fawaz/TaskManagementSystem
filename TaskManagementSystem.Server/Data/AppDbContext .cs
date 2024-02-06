using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Add DbSet properties for your entities
    public DbSet<Client> Clients { get; set; }
}
