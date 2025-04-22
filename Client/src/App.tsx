import { useEffect, useState } from "react";

function App() {
  return (
    <> {/*Kapsayıcı element kullanmamızın sebebi bir Parent COmponent içerisinde birden fazla Child componenet kullanırsak bunları bir kapsayıcı elementin içine almamız gereklidir.*/}
      <Header /> {/*Header componenti bir child component oldu*/}
      <ProductList />
    </>
  );
}

function Header() {
  return (
    <h1>Selam sana demir pençe</h1>
  )
}

function ProductList() {

  const [products, setProducts] = useState([
    {id: 1, name: "product 1", price: 1000, isActive: true},
    {id: 2, name: "product 2", price: 2000, isActive: false},
    {id: 3, name: "product 3", price: 3000, isActive: true},
  ]);

  useEffect(() => {
    fetch("https://localhost:7190/api/products")
    .then(response => response.json()) //gelen response json formatına dönüştürüldü
    .then(data => setProducts(data)); //setProducts ile data state'i güncellendi(yani products isimli diziye response'lar aktarıldı)
  }, []);

  function addProduct(){
    setProducts([...products, { id: 4, name: "product 4", price: 4000, isActive: true }]); //...products listenin var olan değerleridir. Burada yapılan işlem var olan elemanların üstüne yeni bir değer eklememizi sağlar
  }

  return (
    <div>
      <h2>Selam sana demir pençe</h2>
      
      { products.map(p => (
        <Product key={p.id} product={p} />
      ))}

      <button onClick={ addProduct }>Add Product</button> {/*onclick ile butona tıklanıldığı anda addProduct metodu çağırılır.*/}

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
