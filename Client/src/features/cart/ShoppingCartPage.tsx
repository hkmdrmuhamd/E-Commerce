import { useAppDispatch, useAppSelector } from "../../store/store";
import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
 
export default function ShoppingCartPage() 
{
    const { cart, status } = useAppSelector((state) => state.cart); //cart ve status bilgisi alındı
    const dispatch = useAppDispatch();

    if(cart?.cartItems.length === 0) <Alert severity="warning">Sepetinizde Ürün Yok</Alert>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart?.cartItems.map((item) => (
                      <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <img src={`https://localhost:7190/images/${item.imageUrl}`} style={{ height: 60 }} />
                        </TableCell>
                        
                        <TableCell component="th" scope="row">
                          {item.productName}
                        </TableCell>
                        
                        <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                        
                        <TableCell align="right">
                          <LoadingButton 
                            loading={status === "pendingAddItem" + item.productId} 
                            onClick={() => dispatch(addItemToCart({productId: item.productId}))}
                          >
                            <AddCircleOutline />
                          </LoadingButton>
                          {item.quantity}
                          <LoadingButton 
                            loading={status === "pendingDeleteItem" + item.productId + "single"}
                            onClick={() => dispatch(deleteItemFromCart({productId: item.productId, quantity: 1, key: "single"}))}
                          >
                            <RemoveCircleOutline />
                          </LoadingButton>
                        </TableCell>
                        
                        <TableCell align="right">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                        
                        <TableCell align="right">
                            <LoadingButton 
                              color="error" 
                              loading={status === "pendingDeleteItem" + item.productId + "all"} 
                              onClick={() => {
                                dispatch(deleteItemFromCart({productId: item.productId, quantity: item.quantity, key: "all"}))
                                toast.error("Ürün sepetinizden silindi")
                              }}
                            >
                              <Delete />
                            </LoadingButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <CartSummary />
                </TableBody>
            </Table>
        </TableContainer>
    );
}