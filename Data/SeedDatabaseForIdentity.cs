using E_Commerce.Entity;
using Microsoft.AspNetCore.Identity;

namespace E_Commerce.Data
{
    public static class SeedDatabaseForIdentity
    {
        public static async void Initialize(IApplicationBuilder app)
        {
            var userManager = app.ApplicationServices
                                .CreateAsyncScope()
                                .ServiceProvider
                                .GetRequiredService<UserManager<AppUser>>();

            var roleManager = app.ApplicationServices
                                .CreateScope()
                                .ServiceProvider
                                .GetRequiredService<RoleManager<AppRole>>();
        
            if(!roleManager.Roles.Any())
            {
                var admin = new AppRole { Name = "Admin" };
                var customer = new AppRole { Name = "Customer" };
                
                await roleManager.CreateAsync(admin);
                await roleManager.CreateAsync(customer);
            }

            if (!userManager.Users.Any())
            {
                var admin = new AppUser { Name = "Muhammed Hükümdar", UserName = "hkmdr", Email = "hkmdr@denemegmail.com" };
                var customer = new AppUser { Name = "Test User", UserName = "test", Email = "test@denemegmail.com" };

                await userManager.CreateAsync(admin, "Admin_123"); //Create işlemini gönderirken şifre bilgisini de göndermemiz gereklidir.Default olarak alphanumeric karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.
                await userManager.AddToRolesAsync(admin, ["Admin", "Customer"]);

                await userManager.CreateAsync(customer, "Customer_123");
                await userManager.AddToRoleAsync(customer, "Customer");

            }
        }
    }
}
