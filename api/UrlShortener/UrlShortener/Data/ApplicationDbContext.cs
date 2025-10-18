using Microsoft.EntityFrameworkCore;
using UrlShortener.Entities;

namespace UrlShortener.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Entities.User> Users { get; set; }
        public DbSet<Entities.ShortUrl> ShortUrls { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShortUrl>()
                .HasIndex(u => u.ShortCode)
                .IsUnique();

            modelBuilder.Entity<ShortUrl>()
                .HasIndex(u => u.OriginalUrl)
                .IsUnique();
        }
    }
}
