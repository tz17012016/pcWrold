import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>התחברות</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>התחברות</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>קנייה</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>קנייה</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>תשלום</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>תשלום</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>בצע הזמנה</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>בצע הזמנה</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
