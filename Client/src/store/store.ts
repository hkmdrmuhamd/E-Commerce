import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {} //State'e verdiğimiz isimdir.
})

export type RootState = ReturnType<typeof store.getState>//geri dönecek olan state'in tipini tanımlar
export type AppDispatch = typeof store.dispatch

//Bu işlemlerden sonra main.tsx dosyasında Provider'ı ayarlıyoruz.