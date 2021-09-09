import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

import MessageTimer from '../components/MessageTimer';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const schema = yup.object().shape({
  email: yup.string().min(6).max(255).email().trim().lowercase().required(),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9]{3,30}$/)
    .min(6, 'Password must be at least 6 characters')
    .max(10, 'Password more then 10 characters')
    .trim()
    .required(),
});

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';
  let initialValues = {
    email: '',
    password: '',
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (values) => {
    const { email, password } = values;
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <div className='container-fluid mx-auto main shadow p-3 rounded mt-3'>
        <h1 className='text-center'>כניסה</h1>
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

        <Row className='py-5'>
          <Col>
            <Link
              className='btn btn-danger '
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              הרשם כעת
            </Link>
            <span className='ml-2'>?לקוח חדש</span>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
/** disabled
 * 
 *  <Form className='text-end' onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>:מייל</Form.Label>
            <Form.Control
              className='text-end'
              type='email'
              placeholder='הכנס מייל'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group className='mt-3' controlId='password'>
            <Form.Label>:סיסמה</Form.Label>
            <Form.Control
              className='text-end'
              type='password'
              placeholder='הכנס סיסמה'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button
            className='mt-4'
            type='submit'
            size='md'
            block
            variant='primary'>
            התחבר
          </Button>
        </Form>
*/
