using Microsoft.EntityFrameworkCore;
using CustomerApp.Models;
using System.Collections.Generic;

namespace CustomerApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

        public DbSet<Customer> Customers { get; set; }
    }
}
