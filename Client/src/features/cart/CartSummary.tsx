import { TableCell, TableRow } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/useAppSelector";

export default function CartSummary() {
    const { cart } = useAppSelector((state) => state.cart); //cart bilgisi alındı
    const subTotal = cart?.cartItems.reduce((toplam, item) =>toplam + (item.price * item.quantity), 0) ?? 0 //en toplam hesplanırkenki 0 toplam değerinin başlangıç değeridir. Ör: int toplam = 0; gibi. En sonraki 0'da subTotal başlangıçta undefined almak yerine 0 olsun demektir
    const tax = subTotal * 0.2
    const totalPrice = subTotal + tax;
    return(
        <>
            <TableRow>
                <TableCell align="right" colSpan={5}>Ara Toplam</TableCell>
                <TableCell align="right">{currencyTRY.format(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Vergi (%20)</TableCell>
                <TableCell align="right">{currencyTRY.format(tax)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Toplam</TableCell>
                <TableCell align="right">{currencyTRY.format(totalPrice)}</TableCell>
            </TableRow>
        </>
        
    );
}