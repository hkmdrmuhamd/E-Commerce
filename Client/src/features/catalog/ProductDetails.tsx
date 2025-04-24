import { CircularProgress, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addItemToCart } from "../cart/cartSlice";
import { fetchProductById, selectProductById } from "./catalogSlice";

export default function ProductDetailsPage() {

  const { cart, status } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const { id } = useParams<{id: string}>(); //useParams = route üzerinden gelen bilgilerin alınmasını sağlar. 
  // Burada dikkat edilmesi gereken şey şudur: id olarak belirlediğimiz değişkenin Routes ayarlarken / dan sonra yazdığımız parametre ile aynı olmalıdır
  
  const product = useAppSelector(state => selectProductById(state, Number(id))); //useAppSelector üzerinden tanımlamış olduğumuz özel selectProductById adıyla product'ı alabiliriz
  const item = cart?.cartItems.find(i => i.productId == product?.id)
  const { status: loading } = useAppSelector(state => state.catalog); //status: loading bu yapı üstte state kullanıldığı için state'i loading olarak adlandırıp üsttekinden bağımsız bir şekilde sayfada bu şekilde kullanmamızı sağlar

  useEffect( () => {
    if(!product && id)
      dispatch(fetchProductById(parseInt(id)));
  }, [id]) //id bilgisi her değiştiğinde ilgili component render edilir

  if(loading === "pendingFetchProductById") return <CircularProgress />;

  if(!product) return <NotFound />
  
  return (
    <Grid container spacing={6}>
      <Grid size={{ xl:3, lg: 4, md: 5, sm: 6,  xs:12 }}>
        <img src={`https://localhost:7190/images/${product.imageUrl}`} style={{width: "100%"}}/>
      </Grid>
      <Grid size={{ xl:9, lg: 8, md: 7, sm: 6,  xs:12 }}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb:2 }} />
        <Typography variant="h4" color="secondary">{currencyTRY.format(product.price)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={2} sx={{ mt:3 }} alignItems="center">
          <LoadingButton 
            variant="outlined"
            loadingPosition="start"
            startIcon={<AddShoppingCart />}
            loading={status === "pendingAddItem" + product.id}
            onClick={() => dispatch(addItemToCart({productId: product.id}))}
          >
            Sepete Ekle
          </LoadingButton>
          {
            item?.quantity! > 0 && ( //Sonuna ! koymamızın sebebi bu sorgu undefined olabilir diye uyarı vermesidir. Undefined olmadığı durumları kontrol et demek içindir.
              <Typography variant="body2">Sepetinizde bu üründen {item?.quantity} adet bulunmaktadır.</Typography>
            )
          }
        </Stack>
      </Grid>
    </Grid>
  );
}