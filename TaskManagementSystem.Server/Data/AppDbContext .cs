using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Seed();
    }

    public DbSet<Client> Clients { get; set; }
    public DbSet<Country> Countries { get; set; }

    public static void Configure(DbContextOptionsBuilder optionsBuilder, string connectionString)
    {
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new Exception("Check connection string");
        }
        optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 28)));
    }
}

