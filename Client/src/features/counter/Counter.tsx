import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function Counter() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    
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