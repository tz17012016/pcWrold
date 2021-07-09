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

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const { coupons } = useSelector((state) => ({ ...state.couponsList }));

  useEffect(() => {
    loadAllCoupons();
  }, [loading]);

  const loadAllCoupons = async () => {
    return await dispatch(getCoupons());
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      dispatch(createCoupon({ name, expiry, discount }, userInfo.token));
      setLoading(false);
      loadAllCoupons();
      setName('');
      setDiscount('');
      setExpiry('');
    } catch (error) {
      console.log('create coupon err', error);
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

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted'>תאריך תפוגה</label>
              <br />
              <DatePicker
                className='form-control overflow'
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <div className='form-group'>
              <label className='text-muted'>שם הקופון</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className='form-group'>
              <label className='text-muted'>הנחה באחוזים</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <button className='btn btn-outline-primary'>שמור</button>
          </form>

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
