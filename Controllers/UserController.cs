using AutoMapper;
using E_Commerce.DTO.UserDtos;
using E_Commerce.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public UserController(UserManager<AppUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDtos = _mapper.Map<List<GetUserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetUserByUserName(string name)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == name);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }
            var userDto = _mapper.Map<GetUserDto>(user);
            return Ok(userDto);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UpdateUserDto updateUserDto)
        {
            var user = await _userManager.FindByIdAsync(updateUserDto.Id);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }

            _mapper.Map(updateUserDto, user);

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(new { message = "Kullanıcı başarıyla güncellendi." });
            }

            return BadRequest(new { message = "Kullanıcı güncellenemedi." });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return Ok(new { message = "Kullanıcı başarıyla silindi." });
            }
            return BadRequest(new { message = "Kullanıcı silinemedi." });
        }
    }
}
