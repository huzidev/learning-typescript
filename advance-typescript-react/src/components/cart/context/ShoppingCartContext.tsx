import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCartContextProps } from '../types/Types';
import { CartItem } from '../types/Types';

interface ShoppingCartProviderProps {
    // ReactNode is type for children property
    children: ReactNode
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

// custom hook
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>{[]}
    return(
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}