import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Button, ListGroup } from 'react-bootstrap';
import { setVisibleTrue } from '../actions/sideDrawerAction';
import { addToCart } from '../actions/cartActions';
import Rating from './Rating';

const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, count]);
  const addToCartHandler = () => {
    if (product._id || product.countInStock >= 0) {
      setCount((prevCount) => prevCount + 1);

      if (count >= 0 && product.countInStock >= count) {
        dispatch(addToCart(product._id, count));
        localStorage.setItem('cartQty', JSON.stringify(count));
        dispatch(setVisibleTrue());
      }
      if (product.countInStock < count) {
        setCount(0);
        localStorage.setItem('cartQty', JSON.stringify(0));
      }
    }
  };

  const goToCartHandler = () => {
    if (product._id) {
      dispatch(addToCart(product._id, count));
    }
  };
  return (
    <Card className='my-3 p-3 rounded '>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>₪{product.price}</Card.Text>
        <ListGroup>
          <ListGroup.Item className='text-start'>
            <Row>
              <Col>
                <Link to={`/cart`}>
                  <Button
                    onClick={goToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}>
                    קנה עכשיו
                  </Button>
                </Link>
              </Col>

              <Col>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={
                    product.countInStock === 0 || product.countInStock < count
                  }>
                  הוסף לסל
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Product;
