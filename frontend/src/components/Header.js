/*jshint esversion: 6 */
import React, { useEffect } from 'react';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { switchTheme } from '../actions/themeActions';
import { Route } from 'react-router-dom';
import { setVisibleTrue } from '../actions/sideDrawerAction';
import { getCategories } from '../actions/categoryActions';
import { Button, Radio } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  UserOutlined,
  TeamOutlined,
  ShoppingOutlined,
  ReconciliationOutlined,
  BarsOutlined,
  AppstoreOutlined,
  TagOutlined,
  SmallDashOutlined,
  LoginOutlined,
  SettingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Badge } from 'antd';
const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;
  useEffect(() => {
    loadCategories();
  }, []);
  const logoutHandler = () => {
    dispatch(logout());
  };
  const opneCartHandler = () => {
    dispatch(setVisibleTrue());
  };

  const loadCategories = () => {
    return dispatch(getCategories());
  };
  return (
    <header>
      <Navbar bg='secondary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Button
            type='primary'
            onClick={opneCartHandler}
            shape='round'
            className='sidDrower'
            icon={<ShoppingCartOutlined />}
            size={'large'}
          />
          <LinkContainer to='/'>
            <Navbar.Brand>PC_WROLD</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/shop'>
            <Navbar.Brand>חנות</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Route render={({ history }) => <SearchBox history={history} />} />

          <Navbar.Collapse
            className='justify-content-end'
            id='basic-navbar-nav'>
            <Nav className='ml-auto '>
              <NavDropdown className='text-end' title='קטגוריות' id='username'>
                {categories.length != null &&
                  categories.map((c) => (
                    <LinkContainer key={c._id} to={`/Shop/category/${c.slug}`}>
                      <NavDropdown.Item className='text-end'>
                        <span className='m-1'>{c.name}</span>
                      </NavDropdown.Item>
                    </LinkContainer>
                  ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            className='justify-content-end'
            id='basic-navbar-nav'>
            <Nav className='ml-auto '>
              {userInfo && !userInfo.isAdmin ? (
                <NavDropdown
                  className='text-end'
                  title={userInfo.name}
                  id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>פרופיל משתמש</span>
                      <span className='m-1'>
                        <UserOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/history'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>הזמנות</span>
                      <span className='m-1'>
                        <ReconciliationOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/wishlist'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>מוצרים שאהבתי</span>
                      <span className='m-1'>
                        <HeartOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/UserProfile'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>עדכון סיסמה</span>
                      <span className='m-1'>
                        <SmallDashOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    className='text-end'
                    onClick={logoutHandler}>
                    יציאה
                  </NavDropdown.Item>
                </NavDropdown>
              ) : userInfo && userInfo.isAdmin ? null : (
                <LinkContainer to='/login'>
                  <Nav.Link className='text-end'>
                    <i className='fas fa-user'></i> כניסה
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={userInfo.name} id='adminmenu'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>פרופיל משתמש</span>
                      <span className='m-1'>
                        <UserOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>משתמשים</span>
                      <span className='m-1'>
                        <TeamOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>מוצרים</span>
                      <span className='m-1'>
                        <ShoppingOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>הזמנות</span>
                      <span className='m-1'>
                        <ReconciliationOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/category'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>קטגוריות</span>
                      <span className='m-1'>
                        <BarsOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/sub'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>קטגוריות משנה</span>
                      <span className='m-1'>
                        {' '}
                        <AppstoreOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/Coupon'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>קופונים</span>
                      <span className='m-1'>
                        {' '}
                        <TagOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/wishlist'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>מוצרים שאהבתי</span>
                      <span className='m-1'>
                        <HeartOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/UserProfile'>
                    <NavDropdown.Item className='text-end'>
                      <span className='m-1'>עדכון סיסמה</span>
                      <span className='m-1'>
                        <SmallDashOutlined />
                      </span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    className='text-end'
                    onClick={logoutHandler}>
                    <span className='m-1'>יציאה</span>
                    <span className='m-1'>
                      <LoginOutlined />
                    </span>
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <span>
                <SettingOutlined />
              </span>

              <LinkContainer className='float-right' to='/cart'>
                <Nav.Link className='text-end float-right'>
                  <Badge overflowCount={10} count={cartItems.length}>
                    <div className='pr-3'>
                      סל הקניות <i className='fas fa-shopping-cart'></i>
                    </div>
                  </Badge>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

/**<button onClick={() => themeTogglerChange()}>Change Theme</button> */
// <span className='badge bg-secondary'>{cartItems.length}</span>
