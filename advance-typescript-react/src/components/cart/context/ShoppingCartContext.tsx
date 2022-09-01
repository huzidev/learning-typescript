import { createContext, ReactNode, useContext } from "react";
import { ShoppingCartContext } from '../types/Types';

interface ShoppingCartProviderProps {
    // ReactNode is type for children property
    children: ReactNode
}

const ShoppingCartContext = createContext({})

// custom hook
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    return(
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}