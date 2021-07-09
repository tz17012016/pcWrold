import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { PlusSquareTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVisibleTrue } from '../../actions/sideDrawerAction';
import { addToCart } from '../../actions/cartActions';
import { Col, Row, Container } from 'react-bootstrap';
import Rating from '../Rating';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('הוסף לסל');

  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (product._id || product.countInStock >= 0) {
      setCount((prevCount) => prevCount + 1);

      if (count >= 0 && product.countInStock >= count) {
        dispatch(addToCart(product._id, count));
        setTooltip('הוסף עוד לסל');
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

  // destructure
  return (
    <>
      <Card
        className='my-3 cards rounded '
        cover={
          <img
            src={product?.image}
            style={{ height: '200px', objectFit: 'cover' }}
            className='p-1'
          />
        }
        actions={[
          <Link
            to={`/cart`}
            onClick={goToCartHandler}
            disabled={product.countInStock < count}>
            <ShoppingCartOutlined className='text-danger' /> <br />
            {product.countInStock < 1 ? 'חסר במלאי' : 'קנה עכשיו'}
          </Link>,

          <Tooltip title={tooltip}>
            <a
              onClick={addToCartHandler}
              disabled={product.countInStock < count}>
              <PlusSquareTwoTone className='text-danger' /> <br />
              {product.countInStock < 1 ? 'חסר במלאי' : 'הוסף לסל'}
            </a>
          </Tooltip>,
        ]}>
        <Link
          style={{ color: 'inherit', textDecoration: 'inherit' }}
          to={`/product/${product._id}`}>
          <Meta
            className='text-center'
            title={
              <>
                <strong>{`${product.name}`}</strong>
              </>
            }
          />

          <Container className='my-3 p-3'>
            <Row>
              <Col className='text-center'>
                <strong>{`₪${product.price} :מחיר`}</strong>
              </Col>
            </Row>
            <Row>
              <Col className='text-center'>
                <strong>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}  :ביקורות`}
                  />
                </strong>
              </Col>
            </Row>
          </Container>
        </Link>
      </Card>
    </>
  );
};

export default ProductCard;
