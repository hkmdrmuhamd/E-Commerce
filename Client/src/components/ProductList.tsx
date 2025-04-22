import { Grid } from "@mui/material";
import { IProduct } from "../model/IProduct";
import Product from "./Product";

interface Props { //Bu tarz interface'ler sayesinde diğer component'lerde parametre kontrolü sağlanır
    products: IProduct[]; //products IProduct dizisinden türetilsin
}

export default function ProductList({products}: Props) {

  return (
    <Grid container spacing={2}>
      
      { products.map((p: IProduct) => (
        <Grid key={p.id} size={{ xs: 6, md:4, lg:3 }}>{/*Küçük cihazlarda yan yana 6x2=12'den 2 ürün, orta cihazlarda yan yana 3 ürün, büyük cihazlarda yan yana 4 ürün gösterilsin*/}
            <Product key={p.id} product={p} />
        </Grid>
      ))}


    </Grid>
  );
}