import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { getCoupons } from '../actions/couponActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { coupons } = useSelector((state) => ({ ...state.couponsList }));
  const [couponName, setCouponName] = useState('');
  const [Discount, setDiscount] = useState(0);
  const [CouponNotFound, setCouponNotFound] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  console.log(Discount);
  console.log(totalAfterDiscount);
  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.17 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    loadAllCoupons();
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const loadAllCoupons = async () => {
    return await dispatch(getCoupons());
  };

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: totalAfterDiscount ? totalAfterDiscount : cart.totalPrice,
      })
    );
    setTotalAfterDiscount(0);
  };

  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    let foundCoupon = coupons.filter((coupon) => coupon.name === couponName);
    if (foundCoupon.length > 0) {
      setDiscount(foundCoupon);
      let finalPrice = (
        cart.totalPrice -
        (cart.totalPrice * foundCoupon[0].discount) / 100
      ).toFixed(2);
      setTotalAfterDiscount(finalPrice);
      setCouponNotFound('');
    } else {
      setCouponName('');
      return setCouponNotFound({
        Message: ' סליחה אך הקופון לא קיים או לא הוחל',
      });
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={4}>
          <Card className='text-end'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>סיכום קנייה</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>₪{cart.itemsPrice}</Col>
                  <Col>מוצרים</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>₪{cart.shippingPrice}</Col>
                  <Col>משלוח</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>₪{cart.taxPrice}</Col>
                  <Col>מכס</Col>
                </Row>
              </ListGroup.Item>
              {Discount ? (
                <ListGroup.Item>
                  <Row>
                    <Col>%{Discount[0].discount}</Col>
                    <Col>הוזלה</Col>
                  </Row>
                </ListGroup.Item>
              ) : (
                ''
              )}

              <ListGroup.Item>
                <Row>
                  <Col>
                    ₪{totalAfterDiscount ? totalAfterDiscount : cart.totalPrice}
                  </Col>
                  <Col>סך הכל</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block text-start'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}>
                  בצע הזמנה
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          <ListGroup className='text-end' variant='flush'>
            <ListGroup.Item>
              <h2>משלוח</h2>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
                <strong>:משלוח</strong>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>שיטת התשלום:</h2>
              {cart.paymentMethod}
              <strong>:סוג התשלום </strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>מוצרים בהזמנה</h2>
              {cart.cartItems.length === 0 ? (
                <Message>סל הקניות שלך ריק</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4}>
                          {item.qty} x ₪{item.price} = ₪{item.qty * item.price}
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form className='text-end' onSubmit={handleSubmitCoupon}>
            <Form.Group controlId='copon'>
              <Form.Label>:הכנס קופון</Form.Label>
              <Form.Control
                type='text'
                className='text-end'
                placeholder='מספר קופון'
                onChange={(e) => setCouponName(e.target.value)}></Form.Control>
            </Form.Group>
            <Row>
              <Col className='text-center text-danger' md={9}>
                {CouponNotFound && CouponNotFound.Message}
              </Col>
              <Col className='text-center'>
                <Button
                  className='mt-4 text-center'
                  type='submit'
                  variant='primary'>
                  החל קופון
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
