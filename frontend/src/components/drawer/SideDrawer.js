import React from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setVisibleTrue,
  setVisibleFalse,
} from './../../actions/sideDrawerAction';
import laptop from '../../images/phone.jpg';

const SideDrawer = ({ children }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const drawer = useSelector((state) => ({ ...state.drawer }));
  const { status } = drawer;
  const { cartItems } = useSelector((state) => ({ ...state.cart }));

  const imageStyle = {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
  };
  const closeSideDrawer = (e) => {
    e.preventDefault();
    dispatch(setVisibleFalse());
  };
  const goToCart = (e) => {
    e.preventDefault();
    closeSideDrawer(e);
    history.push(`/cart`);
  };
  return (
    <Drawer
      className='text-center'
      title={`Cart / ${cartItems.length} Product`}
      placement='left'
      closable={false}
      onClose={(e) => {
        closeSideDrawer(e);
      }}
      visible={status}>
      {cartItems.map((p) => (
        <div key={p.product} className='row'>
          <div className='col'>
            {p.image ? (
              <>
                <img src={p.image} style={imageStyle} />
                <p className='text-center bg-secondary text-light'>
                  {p.name} x {p.qty}
                </p>
              </>
            ) : (
              <>
                <img src={laptop} style={imageStyle} />
                <p className='text-center bg-secondary text-light'>
                  {p.name} x {p.qty}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={(e) => goToCart(e)}
        className='text-center btn btn-primary btn-raised btn-block'>
        Go To Cart
      </button>
    </Drawer>
  );
};

export default SideDrawer;
