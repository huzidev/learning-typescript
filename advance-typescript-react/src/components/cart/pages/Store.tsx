import React from 'react';
import Items from '../../data/items.json';
import { Storeitems } from '../../storeitems/Storeitems';
import { Container } from '../../styled-components/Container.styled';

export function Store() {
  return (
    <Container>
      Store
      <div>
        {Items.map((data) => (
          <div key={data.id}>
            {/* passing props */}
            <Storeitems {...data} />
          </div>
        ))
        }
      </div>
    </Container>
  )
}

