import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PaginateHome from '../components/PaginateHome';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import { Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { Container } from 'react-bootstrap';
import LoadingCard from '../components/LoadingCard';
import SkeletonElement from '../skeletons/SkeletonElement';
import SkeletonCard from '../skeletons/SkeletonCard';
import ProductCard from '../components/cards/productCard';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className='mx-auto shadow p-3 rounded mt-3 main'>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <Container className='mt-3 '>
        <Row className='text-white bg-secondary rounded'>
          <Col>
            <h1 className='text-center'>מוצרים אחרונים</h1>
          </Col>
        </Row>
      </Container>
      <>
        {loading ? (
          <Row>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
              return (
                <Col key={n}>
                  <SkeletonCard />;
                </Col>
              );
            })}
          </Row>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            <Container className=' bg-secondary rounded d-flex justify-content-center'>
              <PaginateHome
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </Container>
          </>
        )}
      </>
    </div>
  );
};

export default HomeScreen;

//<Product product={product} />
