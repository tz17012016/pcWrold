import React, { useState, useEffect } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import AdminNav from './nav/AdminNav';
import UserNav from './nav/UserNav';
import FormContainer from './FormContainer';

const UserProfile = ({ history }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, password }));
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row text-end'>
        <div className='col mx-auto main shadow p-3 rounded mt-3'>
          <Container>
            <Row>
              <Col>
                <h2 className='text-center'>עדכן סיסמה</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {}
                {success && <Message variant='success'>הפרופיל עודכן</Message>}
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <FormContainer>
                    <Form className=' text-end' onSubmit={submitHandler}>
                      <Form.Group controlId='password'>
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='הכנס סיסמה'
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='confirmPassword'>
                        <Form.Label>אמת סיסמה</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='אמת סיסמה'
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }></Form.Control>
                      </Form.Group>

                      <Button type='submit' variant='primary'>
                        עדכן
                      </Button>
                    </Form>
                  </FormContainer>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <div className='col-md-2 text-end'>
          {userInfo.isAdmin ? <AdminNav /> : <UserNav />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
