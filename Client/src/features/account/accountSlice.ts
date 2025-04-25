import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/IUser";
import { FieldValues } from "react-hook-form";
import request from "../../api/request";

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
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    })
})