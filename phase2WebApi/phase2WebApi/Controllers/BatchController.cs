using Microsoft.AspNetCore.Mvc;
using phase2WebApi.Data;
using phase2WebApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using phase2WebApi.Models;

namespace phase2WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BatchController : ControllerBase
    {
        private readonly BatchContext _context;

        public BatchController(BatchContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Batch>>> GetBatches()
        {
            return await _context.Batches.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Batch>> GetBatch(int id)
        {
            var batch = await _context.Batches.FindAsync(id);
            if (batch == null) return NotFound();
            return batch;
        }

        [HttpPost]
        public async Task<ActionResult<Batch>> CreateBatch(Batch batch)
        {
            _context.Batches.Add(batch);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBatch), new { id = batch.BatchId }, batch);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBatch(int id, Batch batch)
        {
            if (id != batch.BatchId) return BadRequest();

            _context.Entry(batch).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBatch(int id)
        {
            var batch = await _context.Batches.FindAsync(id);
            if (batch == null) return NotFound();

            _context.Batches.Remove(batch);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}