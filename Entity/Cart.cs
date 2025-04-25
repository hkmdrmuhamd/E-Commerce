namespace E_Commerce.Entity
{
    public class Cart
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; } = null!;
        public List<CartItem> CartItems { get; set; } = new List<CartItem>(); //sadece new() yazsak da olur bu kısaltılmış halidir. new List<CartItem>() veya sadece new() kullanmamızın sebebi başlangıçta boş bir CartItem listesi oluşturması içindir.

        public void AddItem(Product product, int quantity)
        {
            var item = CartItems.Where(c => c.ProductId == product.Id).FirstOrDefault();

            if (item == null)
            {
                CartItems.Add(new CartItem
                {
                    ProductId = product.Id,
                    Quantity = quantity
                });
            }
            else
            {
                item.Quantity += quantity;
            }
        }

        public void DeleteItem(int productId, int quantity)
        {
            var item = CartItems.Where(c => c.ProductId == productId).FirstOrDefault();
            if (item == null) return;
            if (item != null)
            {
                item.Quantity -= quantity;
                if (item.Quantity == 0)
                {
                    CartItems.Remove(item);
                }
            }
        }
    }

    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int CartId { get; set; }
        public int Quantity { get; set; }
    }
}
