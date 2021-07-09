import React, { useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserWishlist, removeWishlist } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import AdminNav from '../../components/nav/AdminNav';

const Wishlist = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const UserWishlist = useSelector((state) => state.UserWishlist);
  const { loading, error, wishlists } = UserWishlist;
  const { wishlist } = wishlists;
  const dispatch = useDispatch();
  const loadWishlist = () => {
    dispatch(getUserWishlist(userInfo.token));
  };
  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = (productId) => {
    dispatch(removeWishlist(productId, userInfo.token));
    loadWishlist();
  };

  return (
    <div className='container-fluid'>
      <div className='row text-end'>
        <div className='col mx-auto shadow p-3 main rounded mt-3'>
          <h4 className='text-center'>מוצרים שאהבתי</h4>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : wishlist ? (
            wishlist.map((p) => (
              <div key={p._id} className='alert alert-secondary'>
                <Link to={`/product/${p._id}`}>{p.name}</Link>
                <span
                  onClick={() => handleRemove(p._id)}
                  className='btn btn-sm float-left'>
                  <DeleteOutlined className='text-danger' />
                </span>
              </div>
            ))
          ) : (
            <Message variant='success'>! הוסף מוצרים למעודפים</Message>
          )}
        </div>
        <div className='col-md-2'>
          {userInfo.isAdmin ? <AdminNav /> : <UserNav />}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
