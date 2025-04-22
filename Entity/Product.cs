using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Entity
{
    public class Product
    {
        [Key] //Id diye tanımladığımız için [Key] şeklinde belirtmeye gerek yok yazsak da olur yazmasak da.
        public int Id { get; set; }
        [Required] // Name alanı girilmediğinde kullanıcıya bu alan zorunlu uyarısı verir. Yani ? olsa bile yine de kullanıcı bu alanı doldurmak zorunda
        public string? Name { get; set; } // ? bu alan verilmese de Product nesnesi oluşturulsun anlamına gelir.
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public string? ImageUrl { get; set; }
        public int Stock { get; set; }
    }
}
