import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <div className='text-end container-fluid mx-auto main shadow p-3 rounded mt-3'>
        <h1 className='text-center'>רישום</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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
