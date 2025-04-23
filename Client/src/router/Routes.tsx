import { createBrowserRouter } from "react-router";
import App from "../components/App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

export const router = createBrowserRouter([ //Gerekli routing yönlendirmeleri burada yapılır. Bu ayarlandıktan sonra main.tsx dosyasında StrictMode içinde App'i çağırmak yerine bu router'ı çağırması belirtilir.
    {
        path: "/", //Path / ise App component'ini çalıştırır.
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
        ]
    }
    /* Aşağıdaki şekilde yeni routing'ler de eklenebilir
    {
        path: "/admin",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "products", element: <ProductsPage /> },
            { path: "order", element: <OrderPage /> },
        ]
    }
    */ 
]) 