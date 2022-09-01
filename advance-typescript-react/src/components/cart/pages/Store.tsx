import React from 'react';
import Items from '../../data/items.json';
import { Storeitems } from '../../storeitems/Storeitems';
import { Container } from '../../styled-components/Container.styled';

export function Store(): JSX.Element {
  return (
    <Container>
      Store
      <div>
        {Items.map((data) => (
          <div key={data.id}>
            {/* passing props */}
            {/* ...data spread operator to pass all data id, name, url price */}
            <Storeitems {...data} />
          </div>
        ))
        }
      </div>
    </Container>
  )
}

