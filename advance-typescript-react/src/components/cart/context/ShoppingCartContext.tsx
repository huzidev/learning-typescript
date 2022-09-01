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

    function getItemQuantity(id: number) {
        // if item.id === id ? then get (total quantity) else return 0 (quantity)
        return cartItems.find((item) => item.id === id)?.quanity || 0
    }

    return(
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}