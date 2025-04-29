using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    // Note: IdentityDbContext already exposes a Users DbSet for ApplicationUser, so an extra one isn’t necessary.

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // First, let the base configure Identity tables
        base.OnModelCreating(modelBuilder);

        // Configure IdentityRole to use MySQL-friendly column lengths
        modelBuilder.Entity<IdentityRole>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(85);
            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
            entity.Property(e => e.ConcurrencyStamp).HasMaxLength(256);
        });

        // Configure ApplicationUser similarly (if you need to override defaults)
        modelBuilder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(85);
            entity.Property(e => e.ConcurrencyStamp).HasMaxLength(256);
        });

        // Configure Product properties (for example, setting a decimal type)
        modelBuilder.Entity<Product>()
            .Property(p => p.Pret)
            .HasColumnType("decimal(18, 2)");
    }
}
