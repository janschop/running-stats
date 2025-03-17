using Microsoft.EntityFrameworkCore;
using RunningStats.Models;

namespace RunningStats.Data
{
    public class RunningStatsContext : DbContext
    {
        public RunningStatsContext(DbContextOptions<RunningStatsContext> options)
            : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map the Activity entity to the "activities" table
            modelBuilder.Entity<Activity>().ToTable("activities");
        }
    }
}
