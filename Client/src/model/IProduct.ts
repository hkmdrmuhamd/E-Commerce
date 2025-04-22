export interface IProduct
{
    id: number,
    name: string,
    description: string,
    price: number,
    isActive: boolean,
    imageUrl: string,
    stock: number
} //burada bulunan alanlar boş geçildiğinde de kabul edilsin demek için .net'de olduğu gibi ? koyabiliriz ör: description?