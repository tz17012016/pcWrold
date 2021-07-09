import React, { useState, useEffect } from 'react';
import { listProducts, fetchProductsByFilter } from '../actions/productActions';
import { getCategories } from '../actions/categoryActions';
import { getSubs } from '../actions/subActions';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { Row, Col, Container } from 'react-bootstrap';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';
import ProductCard from '../components/cards/productCard';
import SkeletonCard from '../skeletons/SkeletonCard';
import _ from 'lodash';
import { useTraceUpdate } from '../components/useTraceUpdate';
const { SubMenu } = Menu;

const ShopScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const [categorySlug, setCategorySlug] = useState(match.params.slug || '');
  console.log(categorySlug);

  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const dispatch = useDispatch();
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;
  const subsList = useSelector((state) => ({ ...state.subsList }));
  const { subs } = subsList;
  const productList = useSelector((state) => state.productList);
  const { error, products, loading } = productList;
  const [change, setChange] = useState(false);
  console.log(change);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  useEffect(() => {
    loadCategories();
    loadSubs();
    loadAllProducts();
    if (change == false) {
      runCategoryBaseOnSlug(categorySlug);
    }
    if (match.params.slug !== categorySlug) {
      setCategorySlug(match.params.slug);
      setChange(false);
    }
  }, [
    dispatch,
    products1,
    categorySlug,
    match.params.slug,
    change,
    pageNumber,
  ]);
  const loadCategories = () => {
    return dispatch(getCategories());
  };

  const loadSubs = () => {
    return dispatch(getSubs());
  };

  const fetchProducts = (arg, page, pages) => {
    fetchProductsByFilter(arg, page, pages).then((res) => {
      setPage(res.data.page);
      setPages(res.data.pages);
      setProducts1(res.data.products);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    dispatch(listProducts('', pageNumber));
  };
  const loadAllProducts2 = () => {
    setProducts2(products);
  };
  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 500);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 1500);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 pl-4 pr-4'
          value={c._id}
          name='category'
          checked={categoryIds.includes(c._id)}>
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  const runCategoryBaseOnSlug = (categorySlug) => {
    let Mslug = categories?.find((category) => category.slug === categorySlug);
    let tempId = '';
    if (Mslug != null) {
      tempId = Mslug._id;
    }
    if (tempId != '') {
      console.log('run 11');
      // reset
      dispatch({
        type: 'SEARCH_QUERY',
        payload: { text: '' },
      });
      setPrice([0, 0]);
      let inTheState = [];
      inTheState = categoryIds;
      let justChecked = tempId;
      let foundInTheState = inTheState.indexOf(justChecked); // index or -1
      console.log(foundInTheState);
      // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
      if (foundInTheState === -1) {
        inTheState.push(justChecked);
      } else {
        // if found pull out one item from index
        inTheState.splice(foundInTheState, 1);
      }
      setCategoryIds(inTheState);
      fetchProducts({ category: inTheState });
      setChange(true);
    }
  };
  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className='p-1 m-1 badge rounded-pill bg-dark '
        style={{ cursor: 'pointer' }}>
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    fetchProducts({ sub });
  };
  const byDate = (a, b) => {
    let d1 = new Date(a.createdAt);
    let d2 = new Date(b.createdAt);
    if (d1.getUTCMonth() > d2.getUTCMonth()) {
      return 1;
    } else if (d1.getUTCMonth() < d2.getUTCMonth()) {
      return -1;
    } else {
      return d1.getUTCDate() - d2.getUTCDate();
    }
  };
  const byPriceMin = (a, b) => {
    return a.price - b.price;
  };
  const byPriceMax = (a, b) => {
    return b.price - a.price;
  };
  const byRatingMax = (a, b) => {
    return b.rating - a.rating;
  };

  const onChange = (value, products1, products) => {
    switch (value) {
      case 'newest':
        if (products1.length < 1) {
          let temp1 = products.sort(byDate);
          return setProducts2([...temp1]);
        } else {
          let temp2 = products1.sort(byDate);
          return setProducts1([...temp2]);
        }
      case 'lowest':
        if (products1.length < 1) {
          let temp3 = products.sort(byPriceMin);
          return setProducts2([...temp3]);
        } else {
          let temp4 = products1.sort(byPriceMin);
          return setProducts1([...temp4]);
        }
      case 'highest':
        if (products1.length < 1) {
          let temp5 = products.sort(byPriceMax);
          return setProducts2([...temp5]);
        } else {
          let temp6 = products.sort(byPriceMax);
          return setProducts1([...temp6]);
        }
      case 'toprated':
        if (products1.length < 1) {
          let temp7 = products.sort(byRatingMax);
          return setProducts2([...temp7]);
        } else {
          let temp8 = products1.sort(byRatingMax);
          return setProducts1([...temp8]);
        }
      default:
        if (products1.length < 1) {
          let temp9 = products.sort(byDate);
          return setProducts2([...temp9]);
        } else {
          let temp10 = products1.sort(byDate);
          return setProducts1([...temp10]);
        }
    }
  };

  return (
    <div className='container-fluid mx-auto main shadow p-3 rounded mt-3'>
      <div className='row'>
        <div className='col-md-9 pt-2'>
          <Row>
            <Col className='bg-secondary rounded  d-flex justify-content-center  mx-3'>
              <h3 className='text-black text-center  '>מוצרים</h3>
            </Col>
          </Row>
          <Row>
            <Col className='bg-secondary rounded  d-flex justify-content-space-evenly  mx-3'>
              <Row>
                <Col className='text-center'>
                  <span>({products1.length}) תוצאות</span>
                </Col>
                <Col className='text-center'>
                  <select
                    onChange={(e) => {
                      onChange(e.target.value, products1, products);
                    }}>
                    <option className='text-end' value='newest'>
                      חדש ביותר
                    </option>
                    <option className='text-end' value='lowest'>
                      מחיר: מהנמוך לגבוהה
                    </option>
                    <option className='text-end' value='highest'>
                      מחיר: מהגבוהה לנמוך
                    </option>
                    <option className='text-end' value='toprated'>
                      ממוצע על פי ביקורות הגולשים
                    </option>
                  </select>
                </Col>
              </Row>
            </Col>
          </Row>
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
          ) : (
            <>
              {products1.length <= 1 && text.length === 0 ? (
                <Row>
                  {products &&
                    products.map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                </Row>
              ) : (
                <Row>
                  {products1 &&
                    products1.map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                </Row>
              )}
            </>
          )}
        </div>
        <div className='col-md-3 pt-3'>
          <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={['1', '2', '4']} mode='inline'>
            {/* price */}
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarOutlined /> Price
                </span>
              }>
              <div>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `₪${v}`}
                  range
                  value={price}
                  onChange={(value) => handleSlider(value)}
                  max='4999'
                />
              </div>
            </SubMenu>

            {/* category */}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Categories
                </span>
              }>
              <div style={{ maringTop: '-10px' }}>{showCategories()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Sub Categories
                </span>
              }>
              <div style={{ maringTop: '-10px' }} className='pl-4 pr-4'>
                {showSubs()}
              </div>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
