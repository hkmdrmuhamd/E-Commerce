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
      <Product />
    </>
  );
}

function Product() {
  return (
    <h3>Product</h3>
  );
}

export default App
