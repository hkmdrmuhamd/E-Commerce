import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); //tip güvenli kullanıma uymak için her yerde defalarca useDispatch hook'unu kullanamamak için bu şekilde 1 yerde tanımlayıp buradan çağırabiliriz.

/*
Henüz üstteki kullanım oldukça yeni olduğu için bazı eski react toolkit sürümüne sahip projelerde aşağıdaki gibi bir kullanım yapılabilir:
export const useAppDispatch: () => AppDispatch = useDispatch; 
*/