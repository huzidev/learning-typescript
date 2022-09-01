import { createContext, ReactNode, useContext } from "react";

interface ShoppingCartProviderProps {
    // ReactNode is type for children property
    children: ReactNode
}

// types for inc, dec, remove and total quantity
interface ShoppingCartContext {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
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