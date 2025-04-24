import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import HomePage from "../features/HomePage";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetailsPage from "../features/catalog/ProductDetails";
import ErrorPage from "../features/catalog/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";


export const router = createBrowserRouter([ //Gerekli routing yönlendirmeleri burada yapılır. Bu ayarlandıktan sonra main.tsx dosyasında StrictMode içinde App'i çağırmak yerine bu router'ı çağırması belirtilir.
    {
        path: "/", //Path / ise App component'ini çalıştırır.
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "catalog", element: <CatalogPage /> },
            { path: "catalog/:id", element: <ProductDetailsPage /> },
            { path: "cart", element: <ShoppingCartPage /> },
            { path: "error", element: <ErrorPage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate to="/not-found" /> } //Üstteki pathlerden herhangi birisi karşılanmıyorsa not found sayfasına Navigate eder yani o sayfayı açar
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