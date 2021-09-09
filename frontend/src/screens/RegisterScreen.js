import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name more then 32 characters')
    .trim()
    .lowercase()
    .required(),
  email: yup.string().min(6).max(255).email().trim().lowercase().required(),
  password: yup
    .string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    )
    .trim()
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] : '/';
  let initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (values) => {
    const { name, email, password } = values;
    dispatch(register(name, email, password));
  };

  return (
    <FormContainer>
      <div className='text-end container-fluid mx-auto main shadow p-3 rounded mt-3'>
        <h1 className='text-center'>רישום</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submitHandler}>
          {(formik) => {
            const { errors, touched, status, isValid, dirty } = formik;
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
                  <label className='text-muted'>מייל</label>
                  <Field
                    type='text'
                    name='email'
                    id='email'
                    placeholder='הכנס מייל'
                    className={`form-control text-center
                      ${
                        errors.email && touched.email
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                  />
                  <br />
                  <ErrorMessage
                    name='email'
                    component='span'
                    className='error text-danger'
                  />
                </div>
                <div className='form-group'>
                  <label className='text-muted'>סיסמה</label>
                  <Field
                    type='password'
                    name='password'
                    id='password'
                    placeholder='הכנס סיסמה'
                    className={`form-control text-center ${
                      errors.password && touched.password
                        ? 'input-error form-control is-invalid '
                        : ''
                    }`}
                  />
                  <br />
                  <ErrorMessage
                    name='password'
                    component='span'
                    className='error text-danger'
                  />
                </div>
                <div className='form-group'>
                  <label className='text-muted'>אימות סיסמה</label>
                  <Field
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='אימות סיסמה'
                    className={`form-control text-center ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'input-error form-control is-invalid '
                        : ''
                    }`}
                  />
                  <br />
                  <ErrorMessage
                    name='confirmPassword'
                    component='span'
                    className='error text-danger'
                  />
                </div>

                <Button
                  className={
                    !(dirty && isValid) ? 'btn mt-4 disabled-btn' : 'btn mt-4'
                  }
                  type='submit'
                  size='md'
                  block
                  variant='primary'>
                  התחבר
                </Button>
              </Form>
            );
          }}
        </Formik>

        <Row className='py-3'>
          <Col>
            יש לך כבר חשבון ?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              כניסה
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
/**
 * <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>שם</Form.Label>
            <Form.Control
              type='name'
              placeholder='הכנס שם'
              className='text-end'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>מייל</Form.Label>
            <Form.Control
              type='email'
              placeholder='הכנס מייל'
              className='text-end'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>סיסמה</Form.Label>
            <Form.Control
              type='password'
              placeholder='הכנס סיסמה'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>חזור שנית על הסיסמה</Form.Label>
            <Form.Control
              type='password'
              placeholder='ווידוי סיסמה'
              className='text-end'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            הרשם
          </Button>
        </Form>
 */
