// Data/BatchContext.cs
using Microsoft.EntityFrameworkCore;
using phase2WebApi.Models;

namespace phase2WebApi.Data
{
    public class BatchContext : DbContext
    {
        public BatchContext(DbContextOptions<BatchContext> options) : base(options)
        {
        }

        public DbSet<Batch> Batches { get; set; } // DbSet for Batch entity
    }
}