import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { IProduct } from "../../model/IProduct";

export default function CatalogPage() {

    const [products, setProducts] = useState<IProduct[]>([]); //Ürün listesini tutmak için IProduct tipinde bir dizi olarak state tanımlıyoruz

    useEffect(() => {
        fetch("https://localhost:7190/api/products")
        .then(response => response.json()) //gelen response json formatına dönüştürüldü
        .then(data => setProducts(data)); //setProducts ile data state'i güncellendi(yani products isimli diziye response'lar aktarıldı)
    }, []);

    return(
        <ProductList products={products} />
    );
}