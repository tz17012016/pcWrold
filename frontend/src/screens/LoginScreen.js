import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <div className='container-fluid mx-auto main shadow p-3 rounded mt-3'>
        <h1 className='text-center'>כניסה</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form className='text-end' onSubmit={submitHandler}>
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
