import { useAppDispatch } from "../store/store";
import { getUser } from "../features/account/accountSlice";
import { getCart } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "./Header"; 
//Header içinde de accountSlice kullanılıyor. Ama sayfa açıldığında ilk olarak App.tsx çalıştığı için import sıralamasında App.tsx layout'undaki accountSlice'ların altına Header importunu eklemeliyiz. Aksi durumda uygulama hata verir.

function App() {
  const dispatch = useAppDispatch(); //dispatch ile ilgili slice üzerinden cart methodlarına ulaşılabilinir.
  const [loading, setLoading] = useState(true)

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
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
