import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getSubs } from '../actions/subActions';
import { getCategories } from '../actions/categoryActions';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import AdminNav from '../components/nav/AdminNav';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [CategoryId, setCategoryId] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [subId, setsubId] = useState([]);
  const dispatch = useDispatch();

  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const subsList = useSelector((state) => ({ ...state.subsList }));
  const { subs } = subsList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      loadCategories();
      loadSubs();

      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategoryId(product.category);
        setsubId(product.subs);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const loadCategories = () => {
    return dispatch(getCategories());
  };
  const loadSubs = async () => {
    return await dispatch(getSubs());
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    setsubId([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category: CategoryId,
        subs: subId,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={2}>
            <AdminNav />
          </Col>
          <Col>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
              Go Back
            </Link>
            <FormContainer>
              <h1>Edit Product</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}></Form.Control>
                    <Form.File
                      id='image-file'
                      label='Choose File'
                      custom
                      onChange={uploadFileHandler}></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>
                  <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter brand'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter countInStock'
                      value={countInStock}
                      onChange={(e) =>
                        setCountInStock(e.target.value)
                      }></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter description'
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='selectCategory'>
                    <Form.Label>select category</Form.Label>
                    <Form.Control
                      as='select'
                      custom
                      onChange={(e) => (
                        handleCatagoryChange(e), setCategoryId(e.target.value)
                      )}>
                      <option>Please select</option>
                      {categories.length > 0 &&
                        categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='selectsub'>
                    <Form.Label>select subs</Form.Label>
                    <Form.Control
                      as='select'
                      custom
                      multiple
                      value={subs}
                      onChange={(e) => setsubId([...subId, e.target.value])}>
                      <option>Please select</option>
                      {subs.length > 0 &&
                        subs
                          .filter((sub) => sub.parent === CategoryId)
                          .map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                    </Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                    Update
                  </Button>
                </Form>
              )}
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductEditScreen;
