using E_Commerce.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Data
{
    public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser, AppRole, string>(options) //string vermemizin nedeni IdentityUser tablosunun Id alanının string olmasıdır.
    /// AppUser ve AppRole, Identity kütüphanesi ile gelen IdentityRole tablosuna ek olarak eklediğimiz özellikleri barındıran entity sınıfıdır.
    {
        public DbSet<Product> Products { get; set; } = null!; //null değer geçilmeyeceğini belirtir.
        public DbSet<Cart> Carts { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new List<Product>
                {
                    new Product
                    {
                        Id = 1,
                        Name = "Iphone 15",
                        Description = "Güzel bir telefon",
                        Price = 70000,
                        IsActive = true,
                        ImageUrl = "1.jpg",
                        Stock = 100
                    },new Product
                    {
                        Id = 2,
                        Name = "Iphone 16",
                        Description = "Güzel bir telefon",
                        Price = 80000,
                        IsActive = true,
                        ImageUrl = "2.jpg",
                        Stock = 100
                    },new Product
                    {
                        Id = 3,
                        Name = "Iphone 14",
                        Description = "Güzel bir telefon",
                        Price = 60000,
                        IsActive = false,
                        ImageUrl = "3.jpg",
                        Stock = 100
                    },new Product
                    {
                        Id = 4,
                        Name = "Iphone 13",
                        Description = "Güzel bir telefon",
                        Price = 50000,
                        IsActive = true,
                        ImageUrl = "4.jpg",
                        Stock = 100
                    },
                });
        }
    }
}
