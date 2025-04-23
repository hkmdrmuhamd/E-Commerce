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
            var cart = await GetOrCreate();
            return cart;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            var product = await _context.Products.FindAsync(productId);

            if (product == null) return NotFound("the product is not in database");

            cart.AddItem(product, quantity); //Cart sınıfındaki AddItem metodunu çağırıyoruz.

            var result = await _context.SaveChangesAsync(); //Veritabanına kaydediyoruz.
            if (result > 0)
            {
                return CreatedAtAction(nameof(GetCart), cart);//nameof GetCart method adını yazarken oluşabilecek hataların önüne geçmek için kullanılır
            }

            return BadRequest(new ProblemDetails { Title = "The product can not be added to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            var product = await _context.Products.FindAsync(productId);
            
            if (product == null) return NotFound("the product is not in database");
            
            cart.DeleteItem(productId, quantity);
            
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest(new ProblemDetails { Title = "The product can not be deleted from cart" });
        }

        private async Task<Cart> GetOrCreate()
        {
            var cart = await _context.Carts
                            .Include(i => i.CartItems) //Cart tablosundaki CartItems tablosuna gidiyoruz.
                            .ThenInclude(i => i.Product) // CartItems tablosundaki Product tablosuna gidiyoruz.
                            .Where(i => i.CustomerId == Request.Cookies["customerId"])
                            .FirstOrDefaultAsync();
            if (cart == null)
            {
                var customerId = Guid.NewGuid().ToString(); //Guid bir benzersiz kimlik oluşturur.

                var cookieOptions = new CookieOptions
                {
                    Expires = DateTimeOffset.UtcNow.AddDays(30),
                    IsEssential = true
                };

                Response.Cookies.Append("customerId", customerId, cookieOptions); //cookie oluşturuyoruz.
                
                cart = new Cart
                {
                    CustomerId = customerId
                };
                
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }
    }
}
