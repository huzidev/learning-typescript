import React from 'react';
import { FormatCurrency } from '../utils/FormatCurrency';

import { ItemsType } from '../types/Types'
import { useShoppingCart } from '../context/ShoppingCartContext';

export function Storeitems({ id, name, price, url }: ItemsType): JSX.Element {

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart
  } = useShoppingCart()

  const quantity = getItemQuantity(id)

  return (
    <>
      <img src={url} alt="product-img" />
      <h5>
        Product name: {name}
      </h5>
      <p>
        price: {FormatCurrency(price)}
      </p>
      {quantity === 0
        ? (
          <button onClick={() => increaseCartQuantity(id)}>
            + Add To Cart
          </button>
        )
        : (
          <div>
            <button onClick={() => decreaseCartQuantity(id)}>
              -
            </button>
            <div>
              {quantity} in cart
            </div>
            <button onClick={() => increaseCartQuantity(id)}>
              +
            </button>
            <button onClick={() => removeFromCart(id)}>
              Remove
            </button>
          </div>
        )
      }
    </>
  )
}
