import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import request from "../../api/request";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setCart } from "./cartSlice";
 
export default function ShoppingCartPage() 
{
    const { cart } = useAppSelector((state) => state.cart); //cart bilgisi alındı
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({loading: false, id: ""});

    function handleAddItem(productId: number, id: string)
    {
      setStatus({ loading: true, id: id });
      request.Cart.addItem(productId)
        .then(cart => dispatch(setCart(cart)))
        .catch(error => console.log(error))
        .finally(() => setStatus({ loading: false, id: "" }));
    }

    function handleDeleteItem(productId: number, id: string, quantity = 1)//quantity default olarak 1 değerini alır
    {
      setStatus({ loading: true, id: id });
      request.Cart.deleteItem(productId,quantity)
        .then(cart => dispatch(setCart(cart)))
        .catch(error => console.log(error))
        .finally(() => setStatus({ loading: false, id: id }));
    }

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
                            loading={status.loading && status.id === "add" + item.productId} 
                            onClick={() => handleAddItem(item.productId, "add" + item.productId)}
                          >
                            <AddCircleOutline />
                          </LoadingButton>
                          {item.quantity}
                          <LoadingButton 
                            loading={status.loading && status.id === "del" + item.productId} 
                            onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}
                          >
                            <RemoveCircleOutline />
                          </LoadingButton>
                        </TableCell>
                        
                        <TableCell align="right">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                        
                        <TableCell align="right">
                            <LoadingButton 
                              color="error" 
                              loading={status.loading && status.id === "dell_all" + item.productId} 
                              onClick={() => {
                                handleDeleteItem(item.productId, "dell_all" + item.productId, item.quantity)
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