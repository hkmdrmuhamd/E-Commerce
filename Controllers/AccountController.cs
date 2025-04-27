using AutoMapper;
using E_Commerce.Data;
using E_Commerce.DTO.TokenDtos;
using E_Commerce.DTO.UserDtos;
using E_Commerce.Entity;
using E_Commerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager, IMapper mapper, TokenService tokenService, DataContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<GetTokenDto>> Login([FromBody] UserLoginDto userLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userLoginDto.UserName);
            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "username hatalı" });
            }

            var result = await _userManager.CheckPasswordAsync(user, userLoginDto.Password);
            
            if (result)
            {
                var userCart = await GetOrCreate(userLoginDto.UserName);
                var cookieCart = await GetOrCreate(Request.Cookies["customerId"]!);

                if(userCart != null)
                {
                    foreach(var item in userCart.CartItems)
                    {
                        cookieCart.AddItem(item.Product, item.Quantity);
                    }
                    _context.Carts.Remove(userCart);
                }

                cookieCart.CustomerId = userLoginDto.UserName;
                await _context.SaveChangesAsync();

                return Ok(new GetTokenDto
                {
                    Name = user.Name!,
                    Token = await _tokenService.GenerateToken(user)
                });
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            var user = _mapper.Map<AppUser>(userRegisterDto);
            var result = await _userManager.CreateAsync(user, userRegisterDto.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Customer");
                return StatusCode(201);
            }
            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet("getuser")]
        public async Task<ActionResult<GetTokenDto>> GetUser() //Bu method'a erişebilmek için token'a sahip olmak gereklidir.
                                                               //Eğer token varsa ve token geçerliyse bu token'dan User.Identity?.Name! bilgisini alıyoruz
        {
            var user = await _userManager.FindByNameAsync(User.Identity?.Name!); //User.Identity.Name = Token içinden bir claim'i bu şekilde alabiliriz. Bu örnekte token'dan name bilgisi alınmış.
            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "username yada parola hatalı" });
            }

            return new GetTokenDto
            {
                Name = user.Name!,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        private async Task<Cart> GetOrCreate(string custId)
        {
            var cart = await _context.Carts
                            .Include(i => i.CartItems) //Cart tablosundaki CartItems tablosuna gidiyoruz.
                            .ThenInclude(i => i.Product) // CartItems tablosundaki Product tablosuna gidiyoruz.
                            .Where(i => i.CustomerId == custId)
                            .FirstOrDefaultAsync();

            if (cart == null)
            {
                var customerId = User.Identity?.Name;

                if (string.IsNullOrEmpty(customerId))
                {
                    customerId = Guid.NewGuid().ToString();
                    var cookieOptions = new CookieOptions
                    {
                        Expires = DateTimeOffset.UtcNow.AddDays(30),
                        IsEssential = true,
                        SameSite = SameSiteMode.None,
                        Secure = true
                    };

                    Response.Cookies.Append("customerId", customerId, cookieOptions); //cookie oluşturuyoruz.
                }

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


