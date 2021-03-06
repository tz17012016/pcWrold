import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PaginateHome from '../components/PaginateHome';
import {
  deleteProduct,
  createProduct,
  getProductsPopulated,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import AdminNav from '../components/nav/AdminNav';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const ProductsPopulated = useSelector((state) => state.ProductsPopulated);
  const { loading, error, products, page, pages } = ProductsPopulated;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(getProductsPopulated('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-10 mx-auto shadow p-3 main  rounded mt-3'>
            <Row className='align-items-center'>
              <Col className='text-center'>
                <h1>????????????</h1>
              </Col>
            </Row>
            <div className='container-fluid row justify-content-center'>
              <Col md={4} className='text-right'></Col>
              {loadingDelete && <Loader />}
              {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
              {loadingCreate && <Loader />}
              {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <>
                  <div className='costomHight'>
                    <div className='elment-fixed '>
                      <Table
                        responsive='xs'
                        striped
                        bordered
                        hover
                        className='table-sm   '>
                        <thead>
                          <tr className=' text-center'>
                            <th>
                              <Button
                                className='my-3'
                                onClick={createProductHandler}>
                                ???????? ??????
                                <i className='fas fa-plus'></i>
                              </Button>
                            </th>
                            <th>??????????/??????????</th>
                            <th>????????</th>
                            <th>?????????????? ????????</th>
                            <th>????????????????</th>
                            <th>????????</th>
                            <th>???? ????????</th>
                            <th>ID</th>
                          </tr>
                        </thead>
                        <tbody className='text-center elment-fixed'>
                          {products.map((product) => (
                            <tr key={product._id}>
                              <td></td>
                              <td>
                                <Button
                                  variant='danger'
                                  className='btn-sm mr-3'
                                  onClick={() => deleteHandler(product._id)}>
                                  <i className='fas fa-trash'></i>
                                </Button>
                                <LinkContainer
                                  to={`/admin/product/${product._id}/edit`}>
                                  <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                  </Button>
                                </LinkContainer>
                              </td>
                              <td>{product.brand}</td>
                              <td>
                                {product.subs.map((sub) => (
                                  <div key={sub._id}>{sub.name}</div>
                                ))}
                              </td>
                              <td>{product.category?.name}</td>
                              <td>???{product.price}</td>
                              <td>{product.name}</td>
                              <td>{product._id}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <Row className='justify-content-center'>
                    <Col md={1}>
                      <PaginateHome pages={pages} page={page} isAdmin={true} />
                    </Col>
                  </Row>
                </>
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

export default ProductListScreen;
