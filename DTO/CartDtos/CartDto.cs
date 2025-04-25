using E_Commerce.Entity;

namespace E_Commerce.DTO.CartDtos
{
    public class CartDto
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; } = null!;
        public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();
    }

    public class CartItemDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public int Quantity { get; set; }
    }
}
