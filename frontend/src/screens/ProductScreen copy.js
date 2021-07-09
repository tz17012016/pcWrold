import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
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
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
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
                        <Link to={'/'}>
                          <Button
                            onClick={addToCartHandler}
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}>
                            המשך בקנייה
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
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
                <ListGroup.Item>
                  <h4 className='text-end'>:תיאור המוצר</h4>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item>
                  <Image src={product.image} alt={product.name} fluid />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col>
              <ListGroup>
                <ListGroup.Item className='text-center'>
                  <h2>ביקורות</h2>
                </ListGroup.Item>
                {product.reviews.map((review) => (
                  <ListGroup.Item className='text-end' key={review._id}>
                    <Card border='primary'>
                      <Card.Header>
                        <strong>{review.name}</strong>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title className='text-start'>
                          <Rating value={review.rating} />
                        </Card.Title>
                        <Card.Text className='text-start'>
                          {review.createdAt.substring(0, 10)}
                        </Card.Text>
                        <Card.Text>{review.comment}</Card.Text>
                      </Card.Body>
                    </Card>
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
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></Form.Control>
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
