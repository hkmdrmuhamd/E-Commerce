import { useEffect, useState } from "react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import request from "../api/request";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCart } from "../features/cart/cartSlice";
import { logout, setUser } from "../features/account/accountSlice";
import Header from "./Header"; 
//Header içinde de accountSlice kullanılıyor. Ama sayfa açıldığında ilk olarak App.tsx çalıştığı için import sıralamasında App.tsx layout'undaki accountSlice'ların altına Header importunu eklemeliyiz. Aksi durumda uygulama hata verir.

function App() {
  const dispatch = useAppDispatch(); //dispatch ile ilgili slice üzerinden cart methodlarına ulaşılabilinir.
  const [loading, setLoading] = useState(true)

  useEffect(() => { //Sayfa yüklendiği anda cart bilgilerini almamızı sağlar. Eğer kullanıcının sepetinde bilgi varsa cookie üzerinden bu alınır ve sepetindeki bilgiler görüntülenebilir.
    dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))//loacStorage üzerindeki user bilgisini çıkarıp setUser'a gönderiyoruz.
    //setUser da state'in durumunu bizim üst satırdaki gönderdiğimiz bilgiye göre güncelliyor. Yani artık state'de user bilgisi var.
    
    request.Account.getUser() //Bu işlemi yapmamızın sebebi de almış olduğumuz token'ın geçerli bir token olup olmadığını tespit edebilmek için API'ye yaptığımı bir sorgudur.
      .then(user => {
        setUser(user); //Eğer token geçerli değilse API yeni bir token oluşturup gönderiyor. Bu token'la state'de bulunan toke'ımızı değişmek için tekrardan setUser'ı çağırıyoruz. Eğer token geçerliyse sadece state'i tekrar günceller.
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch(error => {
        console.log(error);
        dispatch(logout());
      });
    
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
