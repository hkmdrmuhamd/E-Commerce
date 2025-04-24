import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../model/IProduct";
import request from "../../api/request";
import { RootState } from "../../store/store";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts", //Oluşturduğumuz action'ın adıdır
    async () => {
        return await request.Catalog.list();
    }
)
export const fetchProductById = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductById",
    async (productId) => {
        return await request.Catalog.details(productId);
    }
)

const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState({
    status: "idle",
    isLoaded: false //bu değeri belirlememizdeki amaç sayfa ilk yüklendiğinde db'den verileri alsın bu değer true olsun ve daha sonra farklı component'e geçip tekrardan ilgili component'e geldiğimizde bu değer true olacağı için tekrar tekrar db'den verileri çekme işleminin önüne geçmiş oluruz
})

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pendingFetchProducts";
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoaded = true;
            // createEntityAdapter, verileri "id" değerine göre düzenli (normalize) şekilde saklamamızı sağlar.
            // Bu sayede veriye daha hızlı ulaşabilir, kolayca güncelleyebilir ve silebiliriz.
            // setAll metodu, API'den gelen ürünleri payload aracılığı ile state'e ekler.
            productsAdapter.setAll(state, action.payload);
            state.status = "idle";
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "idle";
        })
        builder.addCase(fetchProductById.pending, (state) => {
            state.status = "pendingFetchProductById";
        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload); //upsertOne = ürün yoksa payload ile state'e ekler. eğer ürün varsa mevcut olan ürünü state üzerinden günceller.
            state.status = "idle";
        })
        builder.addCase(fetchProductById.rejected, (state) => {
            state.status = "idle";
        })
    })
})

export const { 
    selectById: selectProductById, //Bu, selectById fonksiyonunu al ve selectProductById adıyla kullanıma aç demektir.
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts
} = productsAdapter.getSelectors((state: RootState) => state.catalog) //Bu kodun amacı: productsAdapter'in verdiği hazır selector'ları, state.catalog içinde çalışacak şekilde ayarlamak  Ve bunları dışa aktarıp her yerde kolayca kullanmak.