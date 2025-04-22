using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetProducts()
        {

        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {

        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product)
        {

        }
    }
}
