import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getSubs } from '../actions/subActions';
import { getCategories, getCategorySubs } from '../actions/categoryActions';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import AdminNav from '../components/nav/AdminNav';
import { Select as SelectA } from 'antd';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const { Option } = SelectA;

const schema = yup.object().shape({
  name: yup.string().min(2).max(100).required('Name is required'),
  imageUrl: yup.string().required('imageUrl is required'),
  image: yup.boolean().default(false),
  price: yup.number().required('Price is required'),
  brand: yup.string().required('brand is required'),
  category: yup.string().required('category id is required'),
  subs: yup.lazy((val) =>
    Array.isArray(val)
      ? yup.array().of(yup.string()).required('subs is required')
      : yup.string().required('subs is required')
  ),
  description: yup.string().min(2).required('description is required'),
  countInStock: yup.number().required('countInStock is required'),
});

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [image, setImage] = useState('');
  const [imageIn, setImageIn] = useState(false);
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
  let initialValues = {
    name: product.name ? product.name : '',
    imageUrl: image ? image : product.image ? product.image : '',
    image: imageIn ? imageIn : false,
    price: product.price ? product.price : '',
    brand: product.brand ? product.brand : '',
    category: product.category ? product.category : '',
    subs: product.subs ? product.subs : [],
    description: product.description ? product.description : '',
    countInStock: product.countInStock ? product.countInStock : '',
  };
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      loadCategories();
      loadSubs();
      loadProduct();
    }
  }, [dispatch, product]);
  const loadProduct = () => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
      setsubId(product.subs);
      dispatch(getCategorySubs(subId));
      let arr = [];
      subs.map((s) => {
        arr.push(s._id);
      });
      console.log('ARR', arr);
    } else {
      setImage(product.image);
    }
  };

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
      const { data } = await axios.post(`/api/upload`, formData, config);
      setImageIn(true);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setImageIn(false);
      setUploading(false);
    }
  };

  const submitHandler = (values) => {
    console.log(values);
    const {
      name,
      price,
      imageUrl,
      brand,
      category,
      subs,
      description,
      countInStock,
    } = values;
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image: imageUrl,
        brand,
        category,
        subs,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        חזור אחורה
      </Link>
      <FormContainer>
        <div className='main mx-auto shadow p-3 rounded mt-3 '>
          <h1 className='text-center'>ערוך מוצר</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              enableReinitialize
              onSubmit={submitHandler}>
              {(formik) => {
                const {
                  values,
                  isSubmitting,
                  errors,
                  touched,
                  status,
                  isValid,
                  dirty,
                  setFieldValue,
                } = formik;
                return (
                  <Form className='text-end'>
                    <div className='form-group'>
                      <label className='text-muted'>שם</label>
                      <Field
                        type='text'
                        name='name'
                        id='name'
                        placeholder='הכנס שם'
                        className={`form-control text-center
                      ${
                        errors.name && touched.name
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                      />
                      <br />
                      <ErrorMessage
                        name='name'
                        component='span'
                        className='error text-danger'
                      />
                    </div>
                    <div className='form-group'>
                      <Row>
                        <Col>
                          <label className='text-muted'>קטגוריית משנה</label>

                          <SelectA
                            mode='multiple'
                            name='subs'
                            id='subs'
                            style={{ width: '100%' }}
                            className={`form-control text-center
                      ${
                        errors.image && touched.image
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                            placeholder='Please select'
                            value={values.subs}
                            onChange={(value) => setFieldValue('subs', value)}>
                            {subs.length &&
                              subs
                                .filter((sub) => sub.parent === values.category)
                                .map((s) => (
                                  <Option key={s._id} value={s._id}>
                                    {s.name}
                                  </Option>
                                ))}
                          </SelectA>
                          <br />
                          <ErrorMessage
                            name='subs'
                            component='span'
                            className='error text-danger'
                          />
                        </Col>
                        <Col>
                          <label className='text-muted'>קטגוריה</label>
                          <Field
                            as='select'
                            multiple={false}
                            name='category'
                            placeholder='הכנס קטגוריה'
                            className={`form-control text-center
                      ${
                        errors.category && touched.category
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}>
                            <option className='text-center' default value={''}>
                              בחר
                            </option>
                            {categories.length > 0 &&
                              categories.map((c) => (
                                <option
                                  className='text-center'
                                  key={c._id}
                                  value={c._id}>
                                  {c.name}
                                </option>
                              ))}
                          </Field>
                          <br />
                          <ErrorMessage
                            name='category'
                            component='span'
                            className='error text-danger'
                          />
                        </Col>
                      </Row>
                    </div>

                    <div className='form-group'>
                      <Row>
                        <Col className='text-center'>
                          <label className='text-muted'>כתובת תמונה</label>
                          <Field
                            type='text'
                            name='imageUrl'
                            id='imageUrl'
                            value={image}
                            placeholder='הכנס כתובת תמונה'
                            className={`form-control text-center
                      ${
                        errors.imageUrl && touched.imageUrl
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                          />
                          <br />
                          <ErrorMessage
                            name='imageUrl'
                            component='span'
                            className='error text-danger'
                          />
                        </Col>
                        <Col className='text-center'>
                          <label className='text-muted'>תמונה</label>
                          <input
                            type='file'
                            name='image'
                            id='image'
                            onChange={(e) => {
                              uploadFileHandler(e);
                            }}
                            className={`form-control text-center
                      ${
                        errors.image && touched.image
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                          />
                          <br />
                          <ErrorMessage
                            name='image'
                            component='span'
                            className='error text-danger'
                          />
                        </Col>
                      </Row>
                    </div>
                    {uploading && <Loader />}
                    <div className='form-group'>
                      <Row>
                        <Col className='text-center'>
                          <label className=' text-muted '>כמות</label>
                          <Field
                            type='number'
                            name='countInStock'
                            id='countInStock'
                            placeholder='הכנס מחיר'
                            className={`form-control text-center
                            ${
                              errors.countInStock && touched.countInStock
                                ? 'input-error form-control'
                                : 'form-control'
                            }`}
                          />
                          <br />
                          <ErrorMessage
                            name='countInStock'
                            component='span'
                            className='error text-danger'
                          />
                        </Col>
                        <Col className='text-center'>
                          <label className=' text-muted '>מחיר</label>
                          <Field
                            type='number'
                            name='price'
                            id='price'
                            placeholder='הכנס מחיר'
                            className={`form-control text-center
                            ${
                              errors.price && touched.price
                                ? 'input-error form-control'
                                : 'form-control'
                            }`}
                          />
                          <br />
                          <ErrorMessage
                            name='price'
                            component='span'
                            className='error text-danger'
                          />
                        </Col>
                        <Col className='text-center'>
                          <label className=' text-muted '>חברה</label>
                          <Field
                            type='text'
                            name='brand'
                            id='brand'
                            placeholder='שם החברה'
                            className={`form-control text-center
                              ${
                                errors.brand && touched.brand
                                  ? 'input-error form-control'
                                  : 'form-control'
                              }`}
                          />
                          <br />
                          <ErrorMessage
                            name='brand'
                            component='span'
                            className='error text-danger'
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className='form-group'>
                      <label className='text-muted'>תיאור המוצר</label>
                      <Field
                        type='text'
                        as='textarea'
                        rows='5'
                        name='description'
                        id='description'
                        placeholder='תיאור המוצר'
                        className={`form-control text-center
                      ${
                        errors.description && touched.description
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                      />
                      <br />
                      <ErrorMessage
                        name='description'
                        component='span'
                        className='error text-danger'
                      />
                    </div>

                    <Button
                      className={
                        !(dirty && isValid)
                          ? 'btn mt-4 disabled-btn'
                          : 'btn mt-4'
                      }
                      type='submit'
                      size='md'
                      block
                      variant='primary'>
                      עדכן
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
