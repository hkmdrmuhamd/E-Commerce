import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value); //state üzerinden counter value'sunu alabiliriz
    const dispatch = useDispatch<AppDispatch>();
    
    return(
        <>
            <Typography>{count}</Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment())}>increment</Button> {/*onClick içerisinde dispath'i çağırıp onun içinde de direkt olarak ilgili method'umuzu çağırabiliriz.*/}
                <Button onClick={() => dispatch(decrement())}>decrement</Button>
                <Button onClick={() => dispatch(incrementByAmount(5))}>incrementByAmount</Button> {/*Buradaki 5 amount bilgisidir. Bunu oluşturduğumuz koda göre dışarıdan göndermemiz gerekir.*/}
            </ButtonGroup>
        </>
    );
}

//Tüm işlemlerden sonra Counter component'imiz hazır. Dilediğimiz yerde kullanabiliriz. (ör için bkz: AboutPage.tsx)