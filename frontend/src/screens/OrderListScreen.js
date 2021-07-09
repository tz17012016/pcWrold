import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';
import AdminNav from '../components/nav/AdminNav';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col col-md-10 main  mx-auto shadow p-3 rounded mt-3'>
            <h1 className='text-center'>רשימת הזמנות</h1>
            <div className='container-fluid row justify-content-center'>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <div className='costomHight'>
                  <div className='elment-fixed '>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className='table-sm'>
                      <thead className='text-center'>
                        <tr>
                          <th>עריכה</th>
                          <th>נישלח</th>
                          <th>שולם</th>
                          <th>סך הכל</th>
                          <th>תאריך</th>
                          <th>שם משתמש</th>
                          <th>ID</th>
                        </tr>
                      </thead>
                      <tbody className='text-center'>
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <td>
                              <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                  פרטים
                                </Button>
                              </LinkContainer>
                            </td>
                            <td>
                              {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                              ) : (
                                <i
                                  className='fas fa-times'
                                  style={{ color: 'red' }}></i>
                              )}
                            </td>
                            <td>
                              {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                              ) : (
                                <i
                                  className='fas fa-times'
                                  style={{ color: 'red' }}></i>
                              )}
                            </td>
                            <td>₪{order.totalPrice}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order._id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='col-md-2 text-end'>
            <AdminNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderListScreen;
