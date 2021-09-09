import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from '../../../actions/couponActions';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import { Table } from 'react-bootstrap';
import MessageTimer from '../../../components/MessageTimer';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(6, 'שם קצר מדי - חייב להית 6 תווים לפחות')
    .max(12, 'שם ארוך מדי - חייב להיות לכל היותר 12 תווים')
    .trim()
    .uppercase()
    .required('חובה לרשום שם'),
  expiry: yup
    .date()
    .default(() => new Date())
    .required('חובה לרשום תאריך'),
  discount: yup
    .number()
    .min(1, 'אחוז הנחה חייב להיות  מ 1-99 ולא קטן יותר')
    .max(99, 'אחוז הנחה חייב להיות  מ 1-99 ולא גדול יותר')
    .integer('אחוז ההנחה חייב להיות מספר שלם')
    .positive('אחוז ההנחה חייב להיות מספר חיובי')
    .required('חובה לרשום את אחוז ההנחה'),
});

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const { coupons } = useSelector((state) => ({
    ...state.couponsList,
  }));
  const { error, success } = useSelector((state) => ({
    ...state.CreateCoupon,
  }));
  const initialValues = {
    name: '',
    discount: '',
  };
  useEffect(() => {
    loadAllCoupons();
  }, [loading]);
  console.log(error);
  const loadAllCoupons = async () => {
    return await dispatch(getCoupons());
  };

  const handleSubmitForm = (values, actions) => {
    const { name, discount } = values;
    try {
      setLoading(true);
      dispatch(createCoupon({ name, expiry, discount }, userInfo.token));
      setLoading(false);
      loadAllCoupons();
      setName('');
      setDiscount('');
      setExpiry(new Date());
      actions.resetForm();
    } catch (error) {
      console.log('create coupon err', error);
      actions.resetForm();
    }
  };
  const handleRemove = (couponId) => {
    if (window.confirm('? האם למחוק')) {
      try {
        setLoading(true);
        dispatch(removeCoupon(couponId, userInfo.token));
        loadAllCoupons();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row text-end'>
        <div className='col-md-10 mx-auto shadow p-3 main rounded mt-3'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>קופון</h4>
          )}
          {error && <MessageTimer variant='danger'>{error}</MessageTimer>}
          {success && (
            <MessageTimer variant='alert alert-success'>
              קופון נירשם בהצלחה
            </MessageTimer>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmitForm}>
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <div className='container'>
                  <Form>
                    <div className='form-group'>
                      <label className='text-muted'>תאריך תפוגה</label>
                      <br />
                      <DatePicker
                        className='form-control overflow'
                        selected={expiry}
                        dateFormat='dd/MM/yyyy'
                        isClearable
                        onChange={(date) => setExpiry(date)}
                      />
                    </div>
                    <div className='form-group'>
                      <label className='text-muted'>שם הקופון</label>
                      <Field
                        type='text'
                        name='name'
                        id='name'
                        className={
                          errors.name && touched.name
                            ? 'input-error form-control'
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
                      <label className='text-muted'>הנחה באחוזים</label>
                      <Field
                        type='number'
                        name='discount'
                        id='discount'
                        className={
                          errors.discount && touched.discount
                            ? 'input-error form-control'
                            : 'form-control'
                        }
                      />
                      <br />
                      <ErrorMessage
                        name='discount'
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
                </div>
              );
            }}
          </Formik>

          <br />

          <h4> ({coupons.length}) קופונים</h4>

          <Table striped bordered hover responsive className='text-center'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>פעולה</th>
                <th scope='col'>הנחה באחוזים</th>
                <th scope='col'>תאריך תפוגה</th>
                <th scope='col'>שם</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className='text-danger pointer'
                    />
                  </td>
                  <td>{c.discount}%</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className='col-md-2 text-end'>
          <AdminNav />
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
