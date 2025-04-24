import { useEffect, useState } from "react";
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import request from "../api/request";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCart } from "../features/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch(); //dispatch ile ilgili slice üzerinden cart methodlarına ulaşılabilinir.
  const [loading, setLoading] = useState(true)

  useEffect(() => { //Sayfa yüklendiği anda cart bilgilerini almamızı sağlar. Eğer kullanıcının sepetinde bilgi varsa cookie üzerinden bu alınır ve sepetindeki bilgiler görüntülenebilir.
    request.Cart.get()
      .then(cart => dispatch(setCart(cart)))//burada da görüldüğü gibi dispatch ile setCart methodu çağırılmış
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [])

  if(loading) return <CircularProgress />

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
