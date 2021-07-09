import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserProfile from './components/UserProfile';
import SideDrawer from './components/drawer/SideDrawer';
import History from './screens/user/History';
import Wishlist from './screens/user/Wishlist';
import CategoryCreate from './screens/admin/category/CategoryCreate';
import CategoryUpdate from './screens/admin/category/CategoryUpdate';
import CreateCouponPage from './screens/admin/coupon/CreateCouponPage';
import SubCreate from './screens/admin/sub/SubCreate';
import SubUpdate from './screens/admin/sub/SubUpdate';
import Switch from 'react-bootstrap/esm/Switch';
import ShopScreen from './screens/ShopScreen';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <SideDrawer />
      <main className='py-3 '>
        <Container>
          <Switch>
            <Route exact path='/order/:id' component={OrderScreen} />

            <Route exact path='/shipping' component={ShippingScreen} />
            <Route exact path='/Shop' component={ShopScreen} />
            <Route exact path='/Shop/category/:slug' component={ShopScreen} />
            <Route exact path='/Shop/search/:keyword' component={ShopScreen} />
            <Route exact path='/Shop/page/:pageNumber' component={ShopScreen} />
            <Route
              exact
              path='/Shop/search/:keyword/page/:pageNumber'
              component={ShopScreen}
            />
            <Route exact path='/payment' component={PaymentScreen} />
            <Route exact path='/placeorder' component={PlaceOrderScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <ProtectedRoute exact path='/profile' component={ProfileScreen} />
            <ProtectedRoute exact path='/history' component={History} />
            <ProtectedRoute exact path='/wishlist' component={Wishlist} />
            <ProtectedRoute exact path='/UserProfile' component={UserProfile} />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
            <ProtectedRoute
              exact
              path='/admin/userlist'
              component={UserListScreen}
            />
            <ProtectedRoute
              exact
              path='/admin/user/:id/edit'
              component={UserEditScreen}
            />
            <ProtectedRoute
              exact
              path='/admin/Coupon'
              component={CreateCouponPage}
            />
            <ProtectedRoute
              exact
              path='/admin/category'
              component={CategoryCreate}
            />
            <ProtectedRoute
              exact
              path='/admin/category/:slug'
              component={CategoryUpdate}
            />
            <ProtectedRoute exact path='/admin/sub' component={SubCreate} />
            <ProtectedRoute
              exact
              path='/admin/sub/:slug'
              component={SubUpdate}
            />
            <ProtectedRoute
              path='/admin/productlist'
              component={ProductListScreen}
              exact
            />
            <ProtectedRoute
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
              exact
            />
            <ProtectedRoute
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            <ProtectedRoute
              path='/admin/orderlist'
              component={OrderListScreen}
            />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
            <Route path='/' component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
