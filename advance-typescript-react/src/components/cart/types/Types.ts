export interface ItemsType {
    id: number;
    name: string;
    price: number;
    url: string;
}

// types for inc, dec, remove and total quantity
export  interface ShoppingCartContext {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}