import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Table as Table1, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listMyOrders } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

import InvoiceView from '../../components/order/InvoiceView';
import AdminNav from '../../components/nav/AdminNav';
import UserNav from '../../components/nav/UserNav';

const History = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-10 mx-auto shadow p-3  rounded mt-3'>
          <Container className='container-fluid row justify-content-center'>
            <h2>היסטוריית קנייות</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : (
              <div className='costomHight'>
                <div className='elment-fixed '>
                  <Table1
                    striped
                    bordered
                    hover
                    responsive
                    className='table-sm'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <i
                                className='fas fa-times'
                                style={{ color: 'red' }}></i>
                            )}
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
                            <InvoiceView order={order} />
                          </td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button className='btn-sm' variant='light'>
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table1>
                </div>
              </div>
            )}
          </Container>
        </div>
        <div className='col-md-2 text-end'>
          {userInfo.isAdmin ? <AdminNav /> : <UserNav />}
        </div>
      </div>
    </div>
  );
};

export default History;
