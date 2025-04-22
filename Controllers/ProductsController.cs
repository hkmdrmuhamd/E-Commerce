using E_Commerce.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;
        
        public ProductsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(id);
           
            if(product == null)
            {
                return NotFound();
            }
            
            return Ok(product);
        }

        //[HttpPost]
        //public IActionResult CreateProduct([FromBody] Product product)
        //{

        //}
    }
}
