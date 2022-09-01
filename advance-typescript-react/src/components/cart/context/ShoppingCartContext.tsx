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
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    console.log('cardadsa', cartItems);

    function getItemQuantity(id: number) {
        // if item.id === id ? then get (total quantity) else return 0 (quantity)
        return cartItems.find((item: any) => item.id === id)?.quantity || 0
    }


    function increaseCartQuantity(id: number) {
        setCartItems((currItems: any) => {
            // if cart empty
            if (currItems.find((items: any) => items.id === id) == null) {
                return [
                    // all current items
                    ...currItems,
                    {
                        id, 
                        quantity: 1
                    }
                ]
            }
            // if item exist
            else {
                return currItems.map((item: any) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems((currItems: any) => {
            // if only one item is in the cart
            if (currItems.find((items: any) => items.id === id)?.quantity === 1) {
                return currItems.filter((item: any) => item.id !== id)
            }
            // if item exist
            else {
                return currItems.map((item: any) => {
                    if (item.id === id) {
                        return {
                            ...item, 
                            quantity: item.quantity - 1
                        }
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems((currItems: any) => {
            return currItems.filter((item: any) => item.id !== id)
        })
    }

    return(
        <ShoppingCartContext.Provider value={{ 
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}