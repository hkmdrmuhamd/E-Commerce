import { IProduct } from "../model/IProduct";
import Product from "./Product";

interface Props { //Bu tarz interface'ler sayesinde diğer component'lerde parametre kontrolü sağlanır
    products: IProduct[]; //products IProduct dizisinden türetilsin
    addProduct: () => void; //addProduct aldığı bir değer olmayan void tipinde bir fonksiyon olsun
}

export default function ProductList({products,addProduct}: Props) {

  return (
    <div>
      <h2>Selam sana demir pençe</h2>
      
      { products.map((p: IProduct) => (
        <Product key={p.id} product={p} />
      ))}

      <button onClick={ addProduct }>Add Product</button> {/*onclick ile butona tıklanıldığı anda addProduct metodu çağırılır.*/}

    </div>
  );
}