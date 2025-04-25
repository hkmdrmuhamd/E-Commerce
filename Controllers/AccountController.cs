using AutoMapper;
using E_Commerce.DTO.UserDtos;
using E_Commerce.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userLoginDto.UserName);
            if (user == null)
            {
                return BadRequest(new {message = "Girilen kullanıcı adı hatalı."});
            }

            var result = await _userManager.CheckPasswordAsync(user, userLoginDto.Password);
            
            if (!result)
            {
                return Unauthorized();
            }
            return Ok(new { token = "token" });
        }
    }
}
