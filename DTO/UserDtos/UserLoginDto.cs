using System.ComponentModel.DataAnnotations;

namespace E_Commerce.DTO.UserDtos
{
    public class UserLoginDto
    {
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;

    }
}
