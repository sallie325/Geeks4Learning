using G4L.UserManagement.BL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        // SQL Tables/Entity
        public DbSet<User> Users { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Approver> Approvers { get; set; }
        public DbSet<LeaveSchedule> LeaveSchedules { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<SponsoredUser> SponsoredUsers { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Goal> Goals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Leave>().Property(x => x.UsedDays).HasPrecision(10, 2);

            // Create a composite key for the intersection table
            modelBuilder.Entity<SponsoredUser>().HasKey(x => new { x.SponsorId, x.UserId });
        }


    }



    
    

        
}
