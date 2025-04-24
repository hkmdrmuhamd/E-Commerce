import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../model/IProduct";
import request from "../../api/request";

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
    status: "idle"
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
            // createEntityAdapter, verileri "id" değerine göre düzenli (normalize) şekilde saklamamızı sağlar.
            // Bu sayede veriye daha hızlı ulaşabilir, kolayca güncelleyebilir ve silebiliriz.
            // setAll metodu, API'den gelen ürünleri payload aracılığı ile state'e ekler.
            productsAdapter.setAll(state, action.payload); //
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