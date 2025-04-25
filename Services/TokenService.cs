using E_Commerce.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace E_Commerce.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;

        public TokenService(UserManager<AppUser> userManager, IConfiguration config)
        {
            _config = config;
            _userManager = userManager;
        }

        public async Task<string> GenerateToken(AppUser user)
        {
            var claims = new List<Claim> //JWT'nin içine ekleyecek olduğumuz bilgileri buradan ayarlayabiliyoruz
            {
                new Claim(ClaimTypes.Email, user.Email!), //en sonraki ! bu alanın boş gönderilmeyeceğini söyler
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName!)
            };

            var roles = await _userManager.GetRolesAsync(user);
            
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role)); //Kullanıcının role bilgileri de token içerisine bu sayede eklenir
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JWTSecurity:SecretKey"]!)); //appsettings.Development.json'dan aldığımız key bilgisi

            var tokenSettings = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature) //Token'ı imzalamak için gerekli olan bilgiler
            };

            var token = tokenHandler.CreateToken(tokenSettings); //Token'ı oluşturuyoruz

            return tokenHandler.WriteToken(token); //Token'ı string olarak döndürüyoruz
        }
    }
}
