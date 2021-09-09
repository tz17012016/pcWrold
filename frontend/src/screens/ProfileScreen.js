import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import MessageTimer from '../components/MessageTimer';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import AdminNav from '../components/nav/AdminNav';
import UserNav from '../components/nav/UserNav';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const schema = yup.object().shape({
  name: yup.string().min(2).max(32).trim().lowercase().required(),
  email: yup.string().min(6).max(255).email().trim().lowercase().required(),
});
const ProfileScreen = ({ location, history, match }) => {
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
  let initialValues = {
    name: user.name ? user.name : '',
    email: user.email ? user.email : '',
  };
  const submitHandler = (values) => {
    const { name, email } = values;
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
                        <MessageTimer variant='success'>
                          הפרופיל עודכן
                        </MessageTimer>
                      )}
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <MessageTimer variant='danger'>{error}</MessageTimer>
                      ) : (
                        <Formik
                          initialValues={initialValues}
                          validationSchema={schema}
                          enableReinitialize={true}
                          onSubmit={submitHandler}>
                          {(formik) => {
                            const { errors, touched, status, isValid, dirty } =
                              formik;
                            return (
                              <Form className='text-end'>
                                <div className='form-group'>
                                  <label className='text-muted'>שם</label>
                                  <Field
                                    type='text'
                                    name='name'
                                    id='name'
                                    className={
                                      errors.name && touched.name
                                        ? 'input-error form-control is-invalid '
                                        : 'form-control'
                                    }
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
                                    className={
                                      errors.email && touched.email
                                        ? 'input-error form-control'
                                        : 'form-control'
                                    }
                                  />
                                  <br />
                                  <ErrorMessage
                                    name='email'
                                    component='span'
                                    className='error text-danger'
                                  />
                                </div>

                                <button
                                  type='submit'
                                  className={
                                    !(dirty && isValid)
                                      ? 'btn btn-outline-primary disabled-btn'
                                      : 'btn btn-outline-primary'
                                  }
                                  disabled={!(dirty && isValid)}>
                                  שמור
                                </button>
                              </Form>
                            );
                          }}
                        </Formik>
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
/** disabled
 * 
 * 
 * 
 *  <Form onSubmit={submitHandler}>
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
*/
