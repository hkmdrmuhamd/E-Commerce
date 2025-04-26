import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab"
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";

interface Props { //props parametresini daha güvenilir bir şekilde, kontrol altına alınabilir bir şekilde yapmak için kullanılır
    product: IProduct;
}

export default function Product({product}: Props) {
  
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.cart);

  return (
    <Card>
        <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`https://localhost:7190/images/${product.imageUrl}`}/> {/*sx={{ height: 160, backgroundSize: "contain" }} burada resme bir uzunluk verdik bir de oluşturduğumuz kart içerisinde responsive olarak resmin kendini ayarlamasını sağladık*/}
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color="text.secondary"> {/*gutterBottom alttan biraz boşluk bırakmayı sağlar*/}
            {product.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">{product.description}</Typography>
          
          <Typography variant="body2" color="secondary">Fiyat: {currencyTRY.format(product.price )}</Typography>
          
          <CardActions sx={{ px: 0, pb: 0, pt: 1 }}>
            <LoadingButton 
              variant="outlined" size="small"
              sx={{ minWidth: 130 }}
              loading={status === "pendingAddItem" + product.id}
              loadingPosition="start"
              color="success" 
              startIcon={<AddShoppingCart />}  
              onClick={() => dispatch(addItemToCart({productId: product.id}))}
              >
                Sepete ekle
            </LoadingButton>

            <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} sx={{ minWidth: 110 }} color="primary">Görüntüle</Button>
          </CardActions>
        
        </CardContent>
    </Card>
  );
}