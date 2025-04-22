import { IProduct } from "../model/IProduct";

interface Props { //props parametresini daha güvenilir bir şekilde, kontrol altına alınabilir bir şekilde yapmak için kullanılır
    product: IProduct;
}

export default function Product({product}: Props) { //props: any dediğimiz yapı props adında bir değişken oluştur ve bunun tipi any olsun yani tipsiz olsun demektir. 
  return (
    <>
      { 
        <div>
          <h3>{ product.name }</h3>
          <p>{ product.price }</p>
        </div>
      } 
    </>
  );
}