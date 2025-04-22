import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import Header from "./Header";
import ProductList from "./ProductList";
import ButtonUsage from "./ButtonUsage";

function App() {

  const [products, setProducts] = useState<IProduct[]>([]); //Ürün listesini tutmak için IProduct tipinde bir dizi olarak state tanımlıyoruz

  useEffect(() => {
    fetch("https://localhost:7190/api/products")
    .then(response => response.json()) //gelen response json formatına dönüştürüldü
    .then(data => setProducts(data)); //setProducts ile data state'i güncellendi(yani products isimli diziye response'lar aktarıldı)
  }, []);

  function addProduct(){
    setProducts([...products, { 
      id: 4, 
      name: "product 4", 
      description: "This is product 4",
      price: 4000, 
      isActive: true,
      imageUrl: "4.jpg",
      stock: 100
    }]); //...products listenin var olan değerleridir. Burada yapılan işlem var olan elemanların üstüne yeni bir değer eklememizi sağlar
  }

  return (
    <> {/*Kapsayıcı element kullanmamızın sebebi bir Parent COmponent içerisinde birden fazla Child componenet kullanırsak bunları bir kapsayıcı elementin içine almamız gereklidir.*/}
      <Header products = {products}/> {/*Header componenti bir child component oldu*/}
      <ProductList products = {products} addProduct = {addProduct}/>
      <ButtonUsage />
    </>
  );
}

export default App
