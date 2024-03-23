using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Models;

public class AppDbContext : IdentityDbContext<ApplicationUser,ApplicationRole,int>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { 
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<ApplicationUser>().ToTable("Users");
        modelBuilder.Entity<ApplicationRole>().ToTable("Roles");
        modelBuilder.Entity<IdentityUserRole<int>>().ToTable("UserRoles");
        modelBuilder.Entity<IdentityUserClaim<int>>().ToTable("UserClaims");
        modelBuilder.Entity<IdentityUserLogin<int>>().ToTable("UserLogins");
        modelBuilder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaims");
        modelBuilder.Entity<IdentityUserToken<int>>().ToTable("UserTokens");

        modelBuilder.Entity<ApplicationUser>()
            .HasOne(u => u.Client)
            .WithMany()
            .HasForeignKey(u => u.ClientId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ApplicationRole>()
                .HasOne(r => r.ApplicationUser)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ApplicationUser>()
            .HasIndex(e => e.NormalizedUserName)
            .IsUnique(false);

        modelBuilder.Entity<ApplicationRole>()
            .HasIndex(e => e.NormalizedName)
            .IsUnique(false);

        modelBuilder.Entity<UserVerificationCode>()
                .HasKey(uvc => new { uvc.UserId, uvc.VerificationCode });

        modelBuilder.Entity<UserVerificationCode>()
            .HasOne(uvc => uvc.User)
            .WithMany()
            .HasForeignKey(uvc => uvc.UserId);

        

        modelBuilder.Seed();

    }

    public DbSet<Country> Countries { get; set; }
    public DbSet<UserVerificationCode> UserVerificationCodes { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    

    public static void Configure(DbContextOptionsBuilder optionsBuilder, string connectionString)
    {
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new Exception("Check connection string");
        }
        optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 0)));
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entities = ChangeTracker.Entries()
            .Where(x => x.Entity is BaseEntityModel && (x.State == EntityState.Added || x.State == EntityState.Modified));

        foreach (var entityEntry in entities)
        {
            var entity = (BaseEntityModel)entityEntry.Entity;
            if (entityEntry.State == EntityState.Added)
            {
                entity.createdAt = DateTime.UtcNow;
            }
            entity.UpdateTimestamps();
        }
    }



}

