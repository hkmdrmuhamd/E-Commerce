using E_Commerce.Data;
using E_Commerce.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;
        public CartController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart() //ActionResult olmasının sebebi geriye bir tip dönüşü yapacağımız içindir.
        {
            var cart = await _context.Carts
                            .Include(i => i.CartItems)//Cart tablosundaki CartItems tablosuna gidiyoruz.
                            .ThenInclude(i => i.Product) // CartItems tablosundaki Product tablosuna gidiyoruz.
                            .Where(i => i.CustomerId == Request.Cookies["customerId"])
                            .FirstOrDefaultAsync();

            
            if (cart == null)
            {
                return NotFound();
            }
            return cart;
        }
    }
}
