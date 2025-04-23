import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

function App() {

  const [products, setProducts] = useState<IProduct[]>([]); //Ürün listesini tutmak için IProduct tipinde bir dizi olarak state tanımlıyoruz

  useEffect(() => {
    fetch("https://localhost:7190/api/products")
    .then(response => response.json()) //gelen response json formatına dönüştürüldü
    .then(data => setProducts(data)); //setProducts ile data state'i güncellendi(yani products isimli diziye response'lar aktarıldı)
  }, []);

  return (
    <> {/*Kapsayıcı element kullanmamızın sebebi bir Parent COmponent içerisinde birden fazla Child componenet kullanırsak bunları bir kapsayıcı elementin içine almamız gereklidir.*/}
      <CssBaseline /> {/*İçeriği sağdan soldan sıfırlar sayfanın tam kenarlarına oturtur*/}
      <Header /> {/*Header componenti bir child component oldu*/}
      
      <Container>{/*İeriği bir container içine alır ve sağdan soldan ortalar*/}
        <Outlet /> {/*Artık bu kısma dinamik olarak farklı component'ler farklı sayfalar gelebilir anlamı taşır.*/}
      </Container>
    </>
  );
}

export default App
