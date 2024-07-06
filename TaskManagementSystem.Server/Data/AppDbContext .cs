using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
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
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ApplicationRole>()
            .HasOne(r => r.ApplicationUser)
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserVerificationCode>()
            .HasKey(uvc => new { uvc.UserId, uvc.VerificationCode });

        modelBuilder.Entity<UserVerificationCode>()
            .HasOne(uvc => uvc.User)
            .WithMany()
            .HasForeignKey(uvc => uvc.UserId);

        modelBuilder.Entity<ProjectTask>()
            .HasIndex(t => t.taskId)
            .IsUnique();

        modelBuilder.Entity<TaskComment>()
            .HasIndex(t => t.author)
            .IsUnique();

        modelBuilder.Entity<Project>()
            .HasMany(p => p.groups)
            .WithOne(g => g.project)
            .HasForeignKey(g => g.projectId);

        modelBuilder.Entity<Project>()
            .HasMany(p => p.tasks)
            .WithOne(t => t.project)
            .HasForeignKey(t => t.projectId);

        modelBuilder.Entity<ProjectGroup>()
            .HasMany(g => g.projectTasks)
            .WithOne(t => t.group)
            .HasForeignKey(t => t.groupId);

        modelBuilder.Entity<ApplicationUser>()
            .HasMany(u => u.AssignedTasks)
            .WithOne(t => t.assigneeUser)
            .HasForeignKey(t => t.assigneeId);

        modelBuilder.Entity<ProjectUser>()
            .HasKey(pu => new { pu.projectId, pu.userId });

        modelBuilder.Entity<ProjectUser>()
            .HasOne(pu => pu.project)
            .WithMany(p => p.projectUsers)
            .HasForeignKey(pu => pu.projectId);

        modelBuilder.Entity<ProjectUser>()
            .HasOne(pu => pu.user)
            .WithMany(u => u.ProjectUsers)
            .HasForeignKey(pu => pu.userId);

        modelBuilder.Seed();
    }

    #region DatabaseTables
    public DbSet<Country> Countries { get; set; }
    public DbSet<UserVerificationCode> UserVerificationCodes { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Workflow> Workflows { get; set; }
    public DbSet<ProjectUser> ProjectUsers { get; set; }
    public DbSet<ProjectGroup> ProjectGroups { get; set; }
    public DbSet<ProjectTask> ProjectTasks { get; set; }
    public DbSet<TaskAttachment> TaskAttachments { get; set; }
    public DbSet<TaskComment> TaskComments { get; set; }

    #endregion DatabaseTables


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

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
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
            if (entityEntry.State == EntityState.Modified)
            {
                entity.updatedAt = DateTime.UtcNow;
            }
            entity.UpdateTimestamps();
        }
    }
}

