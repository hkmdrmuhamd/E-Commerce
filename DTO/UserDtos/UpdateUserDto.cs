using System.ComponentModel.DataAnnotations;

namespace E_Commerce.DTO.UserDtos
{
    public class UpdateUserDto
    {
        [Required]
        public string Id { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        //[Required] //Bu alanlar tokenlama işleminden sonra aktifleştirilecek
        //public string Password { get; set; }
        //[Required]
        //[Compare(nameof(Password), ErrorMessage = "Şifreler uyuşmuyor.")]
        //public string ConfirmPassword { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
