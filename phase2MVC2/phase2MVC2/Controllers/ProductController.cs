using Microsoft.AspNetCore.Mvc;
using phase2MVC2.Models;
namespace phase2MVC2.Controllers
{
    public class ProductController:Controller
    {
        public IActionResult Display1()
        {
            ViewBag.name = "aaaa";
            ViewBag.list = new List<Product>();
            ViewData["rn"] = 90;
            ViewData["list"] = new List<Product>();


            Product product = new Product()
            {
                PCode = 1,
                Name = "laptop",
                Qty = 100,
                Details = "some address",
                price=1500
            };
            ViewBag.product = product;
            return View();

        }
        public IActionResult Display2()
        {
            Product product = new Product()
            {
                PCode = 1,
                Name = "xyz",
                Qty = 5,
                Details = "xyz",
                price=1200
            };
            //ViewBag.Product = Product;
            return View(product);

        }
        public IActionResult List1()
        {

            List<Product> products = new List<Product>()
             {new Product()
                {
                PCode = 1,
                Name = "laptop",
                Qty =4,
                Details ="abc",
                price=15000
                },
                new Product()
                {
                PCode = 1,
                Name = "mobile",
                Qty =4,
                Details ="abc",
                price=15000
                },
                new Product()
                {
                PCode = 1,
                Name = "earbuds",
                Qty =4,
                Details ="abc",
                price=15000
                },
                new Product()
                {
                PCode = 1,
                Name = "mouse",
                Qty =4,
                Details ="abc",
                price=15000
                },
             };
            ViewBag.list = products;
            return View();
        }
        public IActionResult List2()
        {

            List<Product> products = new List<Product>()
             {new Product()
               {
                PCode = 1,
                Name = "laptop1",
                Qty =4,
                Details ="abc1",
                price=15000
                },
                new Product()
                {
                PCode = 1,
                Name = "keyboard11",
                Qty =4,
                Details ="abc1",
                price=15000
                },
                new Product()
               {
                PCode = 1,
                Name = "mobile1",
                Qty =4,
                Details ="abc1",
                price=15000
                },
                new Product()
                {
                PCode = 1,
                Name = "mouse1",
                Qty =4,
                Details ="abc1",
                price=15000
                },
             };
            return View(products);
        }
    }
}
