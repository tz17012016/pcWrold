import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        חזור אחורה
      </Link>
      <FormContainer>
        <div className='main mx-auto shadow p-3 rounded mt-3 '>
          <h1 className='text-center'>עדכן את הפרופיל</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} className='text-end'>
              <Form.Group controlId='name'>
                <Form.Label>שם</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='הכנס שם'
                  value={name}
                  onChange={(e) => setName(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>מייל</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='הכנס מייל'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId='isadmin'>
                <Form.Check
                  type='checkbox'
                  label='חשבון מנהל'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
              </Form.Group>

              <Button type='submit' variant='primary'>
                עדכן
              </Button>
            </Form>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
