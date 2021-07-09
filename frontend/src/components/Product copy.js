import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Button, ListGroup } from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';
import Rating from './Rating';

const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [qtyarray, setQtyrry] = useState([]);
  const [qty, setQty] = useState(0);
  console.log(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch, product._id, cartItems.qty]);
  const addToCartHandler = () => {
    if (product._id && cartItems.qty === 0) {
      setQty(cartItems.qty);
      dispatch(addToCart(product._id, qty));
    } else {
      dispatch(addToCart(product._id, { ...cartItems.qty, qty }));
    }
  };

  return (
    <Card className='my-3 p-3 rounded'>
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
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}>
                  קנה עכשיו
                </Button>
              </Col>

              <Col>
                <Link to={'/'}>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}>
                    הוסף לסל
                  </Button>
                </Link>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Product;
