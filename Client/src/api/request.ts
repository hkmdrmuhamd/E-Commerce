import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:7190/api/"

axios.interceptors.response.use( //interceptor = Global hata yönetimi sağlar. Her API çağrısında try/catch yapmana gerek kalmaz.
    // Başarılı cevap geldiğinde doğrudan cevabı döndür.
    response => {
        return response;
    },
    
    // Hata durumunda bu blok çalışır
    (error: AxiosError) => {
        console.log("intercepter..."); // Hata olduğunda konsola mesaj yaz
        
        // Sadece error.response kısmını fırlat (status, data vs. barındırır)
        return Promise.reject(error.response);
    }
);


const queries = {
    get: (url: string) => axios.get(url).then((response: AxiosResponse) => response.data),
    post: (url: string, body: {}) => axios.post(url, body).then((response: AxiosResponse) => response.data),
    put: (url: string, body: {}) => axios.put(url, body).then((response: AxiosResponse) => response.data),
    delete: (url: string) => axios.delete(url).then((response: AxiosResponse) => response.data),
}

const Catalog = {
    list: () => queries.get("products"),
    details: (id: number) => queries.get(`products/${id}`)
}

const request = {
    Catalog
}

export default request