import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/IUser";
import { FieldValues } from "react-hook-form";
import request from "../../api/request";
import { router } from "../../router/Routes";

interface AccountState{
    user: User | null
}

const initialState: AccountState = {
    user: null
}

export const loginUser = createAsyncThunk<User, FieldValues>(
    "account/login",
    async (data, {rejectWithValue}) => {
        try {
            const user = await request.Account.login(data);
            localStorage.setItem("user", JSON.stringify(user))
            return user;
        } catch (error: any) {
            return rejectWithValue({error: error.data});
        }
    }
)

export const accounntSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/catalog")
        },
        setUser: (state, action) => { //Kullanıcı bilgisini localStorage'a almıştık. Bu bilgiyi setUser ile alıp Redux üzerine koyacağız. Bu yüzden bu işlem senkron bir işlemdir.
            state.user = action.payload;
        }
    },
    extraReducers: (builder => { //bu extraReducer alanı asenkron bir sorgu yapıldığında çalışır. Bu sebeple asenkron yaptığımız sorgulamalar için bu alanı kullanırız.
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    })
})

export const { logout, setUser } = accounntSlice.actions