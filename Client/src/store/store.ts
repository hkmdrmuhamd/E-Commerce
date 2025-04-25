import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "../features/counter/counterSlice"
import { cartSlice } from "../features/cart/cartSlice"
import { catalogSlice } from "../features/catalog/catalogSlice"
import { accounntSlice } from "../features/account/accountSlice"

export const store = configureStore({
    reducer: { //State'e verdiğimiz isimdir.
        counter: counterSlice.reducer, //İlgili reducer artık store üzerinden erişilebilir halde.
        cart: cartSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accounntSlice.reducer
    } 
}) //artık yapımız hazır bu sayede artık counter üzerinden istersek methodlara (counterSlice içerisindeki methodlar ör:increment, decrement gibi), istersek de state'lere(ör: initialState) rahatlıkla erişebiliriz.

export type RootState = ReturnType<typeof store.getState>//geri dönecek olan state'in tipini tanımlar. Herhangi bir component'de useSelector ile çağırıldığında state bilgisine RootState tipini vermemiz gereklidir. bkz:(Counter.tsx)
export type AppDispatch = typeof store.dispatch //geri dönecek olan state'in tipini tanımlar. Herhangi bir component'de useDispatch ile çağırıldığında dispatch bilgisine AppDispatch tipini vermemiz gereklidir. bkz:(Counter.tsx)

//Bu işlemlerden sonra main.tsx dosyasında Provider'ı ayarlıyoruz.