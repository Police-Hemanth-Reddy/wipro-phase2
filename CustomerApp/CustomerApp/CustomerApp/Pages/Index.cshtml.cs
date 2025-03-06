using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerApp.Models;
using CustomerApp.Data;

namespace CustomerApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Customer> Customers { get; set; } = new();

        [BindProperty]
        public Customer Customer { get; set; } = new();

        public async Task OnGetAsync()
        {
            Customers = await _context.Customers.ToListAsync();
        }

        public async Task<IActionResult> OnPostCreateAsync()
        {
            if (!ModelState.IsValid) return Page();

            _context.Customers.Add(Customer);
            await _context.SaveChangesAsync();

            return RedirectToPage();
        }
    }
}
