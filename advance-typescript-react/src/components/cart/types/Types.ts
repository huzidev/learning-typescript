export interface ItemsType {
    id: number
    name: string
    price: number
    url: string
}

// types for inc, dec, remove and total quantity
export  interface ShoppingCartContextProps {
    getItemQuantity: (id: number) => number
    // adding Cart is not created adding cart is same as increaseCartQuantity
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

export interface CartItem {
    // by id we can get complete data hence no need for price, name etc
    id: number
    quantity: number
}