import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

import MessageTimer from '../components/MessageTimer';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const schema = yup.object().shape({
  name: yup.string().min(2).max(32).trim().lowercase().required(),
  email: yup.string().min(6).max(255).email().trim().lowercase().required(),
  isAdmin: yup.boolean().default(false),
});

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  let initialValues = {
    name: user.name ? user.name : '',
    email: user.email ? user.email : '',
    isAdmin: user.isAdmin ? user.isAdmin : false,
  };
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (values) => {
    const { name, email, isAdmin } = values;
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
          {errorUpdate && (
            <MessageTimer variant='danger'>{errorUpdate}</MessageTimer>
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
                const { errors, touched, status, isValid, dirty } = formik;
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
                    <div className='form-group form-check'>
                      <label className='text-muted'>
                        <Field
                          type='checkbox'
                          name='isAdmin'
                          id='isAdmin'
                          className={
                            'form-check-input ' +
                            (errors.isAdmin && touched.isAdmin
                              ? ' is-invalid'
                              : '')
                          }
                        />
                        <span className='spase'>חשבון מנהל</span>
                        <br />
                        <ErrorMessage
                          name='isAdmin'
                          component='div'
                          className='invalid-feedback'
                        />
                      </label>
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
        </div>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
/** disabled={!(dirty && isValid)}
 * 
 * <Form onSubmit={submitHandler} className='text-end'>
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
 */
