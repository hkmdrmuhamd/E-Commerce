const  products = [
  {name: "product 1", price: 1000},
  {name: "product 2", price: 2000},
  {name: "product 3", price: 3000},
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
    <>
      <h2>Selam sana demir pençe</h2>
      <Product product={products[0]}/>
      <Product product={products[1]}/>
      <Product product={products[2]}/>
    </>
  );
}

function Product(props: any) { //props: any dediğimiz yapı props adında bir değişken oluştur ve bunun tipi any olsun yani tipsiz olsun demektir. 
  return (
    <>
      <h3>{ props.product.name }</h3> <p>{ props.product.price }</p>
    </>
  );
}

export default App
