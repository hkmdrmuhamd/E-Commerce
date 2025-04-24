import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../model/ICart";

interface CartState { // Bunu yapmamızın sebebi tip güvenliğini korumak içindir
    cart: Cart | null;
}

const initialState: CartState = { //Bu kısımda cart'ın başlangıç değeri belirlenir. Uygulama başladığında cart verisi henüz yüklenmediği için null olarak başlatıyoruz.
    cart: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => { //state ile cart'ı alırız. action'dan gelen payload(veri) ile bunu set ederiz.
            state.cart = action.payload
        }
    }
})

export const { setCart } = cartSlice.actions

//İlgili ayarlamaları yaptıktan sonra genel Slice tanımlamalarını yaptığımız Store.ts üzerinde bunu tanımlamalıyız.