export interface CartItem
{
    productId: number,
    productName: string,
    price: number,
    quantity: number,
    imageUrl: string,
}

export interface Cart
{
    cartId: number,
    customerId: string,
    cartItems: CartItem[],
}