import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { IProduct } from "../../model/IProduct";
import { CircularProgress } from "@mui/material";

export default function CatalogPage() {

    const [products, setProducts] = useState<IProduct[]>([]); //Ürün listesini tutmak için IProduct tipinde bir dizi olarak state tanımlıyoruz
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://localhost:7190/api/products")
        .then(response => response.json()) //gelen response json formatına dönüştürüldü
        .then(data => setProducts(data)) //setProducts ile data state'i güncellendi(yani products isimli diziye response'lar aktarıldı)
        .finally(() => setLoading(false));
    }, []);

    if(loading) return <CircularProgress />;

    return(
        <ProductList products={products} />
    );
}