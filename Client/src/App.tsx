const  products = [
  {id: 1, name: "product 1", price: 1000, is_Active: true},
  {id: 2, name: "product 2", price: 2000, is_Active: false},
  {id: 3, name: "product 3", price: 3000, is_Active: true},
];

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
  return (
    <div>
      <h2>Selam sana demir pençe</h2>
      { products.map(p => (
        <Product key={p.id} product={p} />
      ))}
    </div>
  );
}

function Product(props: any) { //props: any dediğimiz yapı props adında bir değişken oluştur ve bunun tipi any olsun yani tipsiz olsun demektir. 
  return (
    <>
      { props.product.is_Active ? ( //is_Active değeri true olanlar getirilsin 
        <div>
          <h3>{ props.product.name }</h3>
          <p>{ props.product.price }</p>
        </div>
      ) : <p>Bu ürün şu anda satışta değil</p>} 
    </>
  );
}

export default App
