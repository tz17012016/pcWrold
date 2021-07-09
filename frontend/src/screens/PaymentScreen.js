import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='text-center'>שיטת התשלום במעודפת עליך</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label className='text-end' as='legend'>
            סוג התשלום
          </Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='או כרטיס אשראי PayPal '
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            {
              <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            }
          </Col>
        </Form.Group>
        <Row>
          <Col className='text-center'>
            <Button type='submit' variant='primary'>
              המשך
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
