import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import AdminNav from '../components/nav/AdminNav';
import UserNav from '../components/nav/UserNav';

const ProfileScreen = ({ location, history, match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile({ id: user._id, name, email }));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <Row className='text-end'>
            <Col className=' mx-auto shadow p-3 rounded mt-3 main' md={9}>
              <h1 className='text-center'> {userInfo.name} ברוך הבא </h1>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <h2>פרופיל משתמש</h2>
                      {success && (
                        <Message variant='success'>הפרופיל העודכן</Message>
                      )}
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <Message variant='danger'>{error}</Message>
                      ) : (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='name'>
                            <Form.Label>שם משתמש</Form.Label>
                            <Form.Control
                              type='name'
                              placeholder='הכנס שם'
                              value={name}
                              onChange={(e) =>
                                setName(e.target.value)
                              }></Form.Control>
                          </Form.Group>

                          <Form.Group controlId='email'>
                            <Form.Label>כתובת מייל</Form.Label>
                            <Form.Control
                              type='email'
                              placeholder='הכנס מייל'
                              value={email}
                              onChange={(e) =>
                                setEmail(e.target.value)
                              }></Form.Control>
                          </Form.Group>
                          <Button type='submit' variant='primary'>
                            עדכן
                          </Button>
                        </Form>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Col>
          </Row>
        </div>
        <div className='col-md-2 text-end'>
          {userInfo.isAdmin ? <AdminNav /> : <UserNav />}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
