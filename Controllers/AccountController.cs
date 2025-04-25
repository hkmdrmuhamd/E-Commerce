using AutoMapper;
using E_Commerce.DTO.TokenDtos;
using E_Commerce.DTO.UserDtos;
using E_Commerce.Entity;
using E_Commerce.Services;
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
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, IMapper mapper, TokenService tokenService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
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
            
            if (!result)
            {
                return Unauthorized();
            }
            return Ok(new GetTokenDto { 
                Name = user.Name!,
                Token = await _tokenService.GenerateToken(user) 
            });
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
    }
}
