import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cart } from "../model/ICart"

interface CartContextValue { //createContext içine gelecek olan verisinin hangi tipe sahip olacağını belirlemek için kullanılır.
    cart: Cart | null; // verinin içinde bir cart bilgisi olacak olmadığı durumalrda null değer atansın
    setCart: (cart : Cart) => void; //cart bilgisini set edebileceğiz
    deleteItem: (productId : number, quantity: number) => void; //cart bilgisini silebileceğiz
}

export const CartContext = createContext<CartContextValue | undefined>(undefined); //createContext oluşturulurken bizden default olarak bir başlangıç value değeri girilmesi isteniliyor buna undefined atayabiliriz. Yani veri var fakat bu veri tanımlanmadı.

export function useCartContext() { //Bu fonksiyon ile CartContextValue'lardan birini kullanmak istediğimiz her component'de tek tek useContext yapısını kullanmak yerine burada tanımladığımız fonksiyon sayesinde sadece ilgili component'de isim olarak direkt çağırı yapabiliriz
    const context = useContext(CartContext);

    if(context === undefined){
        throw new Error("no provider");
    }

    return context;
}

export function CartContextProvider({children} : PropsWithChildren<any>) { //children bu alana hangi component'lerin erişebilmesi gerektiğini kontrol edecek olan yapıdır. PropsWithChildren<any> = bu da children'lara gelecek olan değerlerin tipini belirler.
    const [cart, setCart] = useState<Cart | null>(null);

    function deleteItem(productId : number, quantity: number) {

    }

    return (
        <CartContext.Provider value={{cart, setCart, deleteItem}}>
            {children} {/*Bu provider'a children'lar erişebilir*/}
        </CartContext.Provider>
    );
}

//Context yapısını oluşturduk. Şimdi de main.tsx dosyasında RouterProvider'ı kapsayacak olan CartContextProvider'ımızı yazmalıyız.