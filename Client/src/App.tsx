import { useEffect, useState } from "react";
import { IProduct } from "./model/IProduct";

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
      <Header /> {/*Header componenti bir child component oldu*/}
      <ProductList products = {products} addProduct = {addProduct}/>
    </>
  );
}

function Header() {
  return (
    <h1>Selam sana demir pençe</h1>
  )
}

function ProductList(props: any) {

  return (
    <div>
      <h2>Selam sana demir pençe</h2>
      
      { props.products.map((p: IProduct) => (
        <Product key={p.id} product={p} />
      ))}

      <button onClick={ props.addProduct }>Add Product</button> {/*onclick ile butona tıklanıldığı anda addProduct metodu çağırılır.*/}

    </div>
  );
}

function Product(props: any) { //props: any dediğimiz yapı props adında bir değişken oluştur ve bunun tipi any olsun yani tipsiz olsun demektir. 
  return (
    <>
      { props.product.isActive ? ( //is_Active değeri true olanlar getirilsin 
        <div>
          <h3>{ props.product.name }</h3>
          <p>{ props.product.price }</p>
        </div>
      ) : <p>Bu ürün şu anda satışta değil</p>} 
    </>
  );
}

export default App
