import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => { //action dışarıdan göndereceğimiz parametreyi temsil eder.
            state.value += action.payload;
        },
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions; // gerekli methodlar dışarıya export edilir.

//Bütün bu işlemlerden sonra store dosyamızda reducer içerisinde bu ifadeleri tanımlarız.