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
        public DbSet<Role> Roles { get; set; }
        public DbSet<Questionnaire> Questionnaires { get; set; }
        public DbSet<AccessLevel> AccessLevels { get; set; }
    }



  /*  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<User>()
            .Property(e => e.Career)
            .HasConversion(
                v => v.ToString(),
                v => (Career)Enum.Parse(typeof(Career), v));

        modelBuilder
            .Entity<AccessLevel>()
            .Property(e => e.access)
            .HasConversion(
                v => v.ToString(),
                v => (Access)Enum.Parse(typeof(Access), v));
    }*/
}
