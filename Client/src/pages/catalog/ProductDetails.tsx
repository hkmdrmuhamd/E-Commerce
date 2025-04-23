import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../model/IProduct";

export default function ProductDetailsPage() {

  const { id } = useParams(); //useParams = route üzerinden gelen bilgilerin alınmasını sağlar. 
  // Burada dikkat edilmesi gereken şey şudur: id olarak belirlediğimiz değişkenin Routes ayarlarken / dan sonra yazdığımız parametre ile aynı olmalıdır
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    fetch(`https://localhost:7190/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id]) //id bilgisi her değiştiğinde ilgili component render edilir

  if(loading) return <h5>Loading...</h5>;

  if(!product) return <h5>Product Not Found</h5>;
  
  return (
    <Typography variant="h2">{product.name}</Typography>
  );
}