import React from 'react';
import { ItemsType } from './types'

export function Storeitems({ name, price, url }: ItemsType): JSX.Element {
  return (
    <div>
      <img src={url} alt="product-img" />
      <h5>
        Product name: {name}
      </h5>
      <p>
        price: ${price}
      </p>
    </div>
  )
}
