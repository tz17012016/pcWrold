import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      <div className='container-fluid mx-auto main shadow p-3 rounded mt-3'>
        <Row>
          <Col>
            <Link className='btn btn-info' to='/'>
              חזור אחורה
            </Link>
          </Col>
          <Col className='text-end'>
            <h1 className='text-center'>סל הקניות</h1>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <ListGroup className='text-end' variant='flush'>
                <ListGroup.Item>
                  <h2>
                    סך הכל ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    ) מוצרים
                  </h2>
                  <strong>
                    ₪
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}>
                    קנה עכשיו
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <Message>
                סל הקניות שלך ריק קנה דבר אחד או שניים :)
                <Link to='/'>חזור אחורה</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>₪{item.price}</Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className='text-end'>
            <h3>מוצרים שאולי יענינו אותך</h3>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CartScreen;
