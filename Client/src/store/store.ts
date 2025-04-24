import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "../features/counter/counterSlice"

export const store = configureStore({
    reducer: { //State'e verdiğimiz isimdir.
        counter: counterSlice.reducer //İlgili reducer artık configureStore üzerinden erişilebilir halde.
    } 
}) //artık yapımız hazır bu sayede artık counter üzerinden istersek methodlara (counterSlice içerisindeki methodlar ör:increment, decrement gibi), istersek de state'lere(ör: initialState) rahatlıkla erişebiliriz.

export type RootState = ReturnType<typeof store.getState>//geri dönecek olan state'in tipini tanımlar
export type AppDispatch = typeof store.dispatch

//Bu işlemlerden sonra main.tsx dosyasında Provider'ı ayarlıyoruz.