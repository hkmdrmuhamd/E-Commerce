using Microsoft.AspNetCore.Identity;

namespace E_Commerce.Entity
{
    public class AppUser : IdentityUser //Bu özellik sayesinde temel olan IdentityUser tablosunun üzerine istediğimiz ekstra özellikleri ekleyebiliriz.
    {
        public string? Name { get; set; }
    }
}
