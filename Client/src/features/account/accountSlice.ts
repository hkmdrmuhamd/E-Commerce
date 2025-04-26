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

export const getUser = createAsyncThunk<User>(
    "account/getuser",
    async (_,thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))//loacStorage üzerindeki user bilgisini çıkarıp setUser'a gönderiyoruz.
    //setUser da state'in durumunu bizim üst satırdaki gönderdiğimiz bilgiye göre güncelliyor. Yani artık state'de user bilgisi var.
        try {
            const user = await request.Account.getUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => { // Bu ifade ile üstteki sorgunun bir şarta bağlı çalışmasını sağlıyoruz. Eğer bu ifade doğru olursa false değeri döner bu durumda sorgu çalışmaz.
            if (!localStorage.getItem("user")) return false;
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
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload; //setUser kullanmamıza gerek yok çünkü bu işlem zaten setUser'ın işinin aynısını yapıyor
        });
        builder.addCase(getUser.rejected, (state) => {
            state.user = null; //eğer bir hata olursa state üzerinde user olmasın.
            localStorage.removeItem("user");
            router.navigate("/login")
        });
    })
})

export const { logout, setUser } = accounntSlice.actions