import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Comment, Image, Avatar, List, Input, Descriptions } from 'antd';
import moment from 'moment';
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
  Breadcrumb,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import ControlledTabs from '../components/ControlledTabs';
import { addToWishlist } from '../actions/userActions';
import _ from 'lodash';
import { setVisibleTrue, setVisibleFalse } from '../actions/sideDrawerAction';
import { addToCart } from '../actions/cartActions';
import Comments from '../components/comments/Comment';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, rating, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const buyNowHandler = () => {
    if (match.params.id) {
      dispatch(addToCart(product._id, qty));
      dispatch(setVisibleTrue());
    }
  };
  const addToWhishHandler = (e) => {
    e.preventDefault();
    dispatch(addToWishlist(product._id, userInfo.token));
    history.push(`/wishlist`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className='btn text-start btn-info my-3' to='/'>
        חזור אחורה
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={3}>
              <Card className='text-end'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>₪{product.price}</strong>
                      </Col>
                      <Col>:מחיר</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {product.countInStock > 0 ? 'במלאי' : 'חסר במלאי'}
                      </Col>
                      <Col>:מצב</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <Form.Control
                            as='select'
                            className='rtl'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                        <Col>:כמות</Col>
                      </Row>
                    </ListGroup.Item>
                  )}

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
                        {userInfo ? (
                          <Button
                            onClick={addToWhishHandler}
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}>
                            הוסף לרשימת המעודפים
                          </Button>
                        ) : (
                          ''
                        )}
                      </Col>

                      <Col>
                        <Button
                          onClick={buyNowHandler}
                          className='btn-block'
                          type='button'
                          disabled={product.countInStock === 0}>
                          הוסף לסל
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ביקורות`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                  ₪{product.price} :מחיר
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item>
                  <Image src={product.image} alt={product.name} />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>

            <Col md={2}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col>
              <ControlledTabs product={product} />
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row className='mt-3'>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item className='text-center'>
                  <h2>ביקורות</h2>
                </ListGroup.Item>
                {product.reviews.map((review) => (
                  <ListGroup.Item className='text-end' key={review._id}>
                    <Comments review={review} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {product.reviews.length === 0 && <Message>אין ביקורות</Message>}
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='text-end'>
                  <h2>אנא כתוב ביקורת על המוצר</h2>
                  {successProductReview && (
                    <Message variant='success'>! הביקורת נישלחה בהצלחה</Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form className='text-end' onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>ביקורות</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option value=''>...בחר</option>
                          <option value='1'>1 - גרוע</option>
                          <option value='2'>2 - סביר</option>
                          <option value='3'>3 - טוב</option>
                          <option value='4'>4 - טוב מאוד</option>
                          <option value='5'>5 - מעולה</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>תגובות</Form.Label>
                        <Row>
                          <Col md={10}>
                            <Form.Control
                              as='textarea'
                              row='4'
                              value={comment}
                              onChange={(e) =>
                                setComment(e.target.value)
                              }></Form.Control>
                          </Col>
                          <Col>
                            <Avatar
                              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                              alt='Han Solo'
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      <Button
                        className='mt-2 text-start'
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'>
                        שלח
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      בבקשה <Link to='/login'>היכנס לאתר</Link>! בכדי לכתוב
                      תגובה{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

/**
 *
 */
