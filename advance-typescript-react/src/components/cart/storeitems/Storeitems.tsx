import React from 'react';
import { FormatCurrency } from '../utils/FormatCurrency';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { ItemsType } from './types'

export function Storeitems({ name, price, url }: ItemsType): JSX.Element {
  return (
    <ShoppingCartProvider>
      <img src={url} alt="product-img" />
      <h5>
        Product name: {name}
      </h5>
      <p>
        price: {FormatCurrency(price)}
      </p>
    </ShoppingCartProvider>
  )
}
