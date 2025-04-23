import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <> {/*Kapsayıcı element kullanmamızın sebebi bir Parent Component içerisinde birden fazla Child componenet kullanırsak bunları bir kapsayıcı elementin içine almamız gereklidir.*/}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline /> {/*İçeriği sağdan soldan sıfırlar sayfanın tam kenarlarına oturtur*/}
      <Header /> {/*Header componenti bir child component oldu*/}
      
      <Container>{/*İeriği bir container içine alır ve sağdan soldan ortalar*/}
        <Outlet /> {/*Artık bu kısma dinamik olarak farklı component'ler farklı sayfalar gelebilir anlamı taşır.*/}
      </Container>
    </>
  );
}

export default App
