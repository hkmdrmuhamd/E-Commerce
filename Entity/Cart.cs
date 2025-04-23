namespace E_Commerce.Entity
{
    public class Cart
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; } = null!;
        public List<CartItem> CartItems { get; set; } = new List<CartItem>(); //sadece new() yazsak da olur bu kısaltılmış halidir.
    }

    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int CartId { get; set; }
        public Cart Cart { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
    }
}
