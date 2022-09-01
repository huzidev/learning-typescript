import React from 'react';
import { FormatCurrency } from '../utils/FormatCurrency';

import { ItemsType } from '../types/Types'

export function Storeitems({ id, name, price, url }: ItemsType): JSX.Element {
  return (
    <>
      <img src={url} alt="product-img" />
      <h5>
        Product name: {name}
      </h5>
      <p>
        price: {FormatCurrency(price)}
      </p>
    </>
  )
}
