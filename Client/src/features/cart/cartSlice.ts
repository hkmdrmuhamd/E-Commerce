import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../model/ICart";
import request from "../../api/request";

interface CartState { // Bunu yapmamızın sebebi tip güvenliğini korumak içindir
    cart: Cart | null;
    status: string; //loading değere karşolık gelmesi için belirlediğimiz değişken
}

const initialState: CartState = { //Bu kısımda cart'ın başlangıç değeri belirlenir. Uygulama başladığında cart verisi henüz yüklenmediği için null olarak başlatıyoruz.
    cart: null,
    status: "idle" //idle yerine istediğimiz değeri verebiliriz. createAsyncThunk documantasyon'unda bu şekilde verilmiş. status verisi henüz set edilmemiş, başlangıç verisi olduğunu belirtiyoruz
}

export const addItemToCart = createAsyncThunk<Cart, { productId: number, quantity?: number }>( //dışarıdan productId ve nullable bir quantity değeri alır.
    "cart/addItemToCart",
    async ({productId, quantity = 1}) => {
        try {
            return await request.Cart.addItem(productId,quantity); //geri dönüş değeri promise olduğu için durumlarını kontrol etmeliyiz. createSlice içerisinde bunları kontrol ederiz.

        } catch (error) {
            console.log(error)
        }
    } 
)
export const deleteItemFromCart = createAsyncThunk<Cart, { productId: number, quantity?: number }>(
    "cart/deleteItemFromCart",
    async ({productId, quantity = 1}) => {
        try {
            return await request.Cart.deleteItem(productId,quantity);

        } catch (error) {
            console.log(error)
        }
    } 
)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => { //state ile cart'ı alırız. action'dan gelen payload(veri) ile bunu set ederiz.
            state.cart = action.payload
        }
    },
    extraReducers: (builder) => {
        //state, uygulamanın tüm verilerini ve durumunu tutan yerdir. Yani kısaca uygulamanın o anki durumudur.
        //action, state’te değişmesini istediğimiz bir olaydır. Dışarıdan gönderdiğimiz bir değer olur.
        builder.addCase(addItemToCart.pending, (state, action) => { //pending demek sorgu gönderildiği sıradaki durumu kontrol etmek için kullanılır
            console.log(action);
            state.status = "pending"; //api çağırısı sırasında bir işlemin başladığını ve veri beklendiğini belirmek için kullanılır.
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => { //fulfilled servisten cevap geldiği aşamadır
            state.cart = action.payload; //gelen yeni veriyi (yani sepetteki ürünleri) state.cart içine kaydeder
            state.status = "idle"; //Async işlem sona erdiğinde status değerini "idle" olarak günceller. yani hiçbir async işlem yapılmıyor, sistem boşta anlamına gelir
        });
        builder.addCase(addItemToCart.rejected, (state) => { //rejected adından da anlaşılacağı gibi sorgu reddedildiğinde bir hata ile karşılaşıldığında oluşan kısımdır
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCart.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "idle";
        });
    }
})

export const { setCart } = cartSlice.actions

//İlgili ayarlamaları yaptıktan sonra genel Slice tanımlamalarını yaptığımız Store.ts üzerinde bunu tanımlamalıyız.