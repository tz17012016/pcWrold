import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => (
  <nav>
    <ul className='nav flex-column hoverComponnent '>
      <li className='nav-item rounded'>
        <Link to='/profile' className='nav-link'>
          פרופיל משתמש
        </Link>
      </li>
      <li className='nav-item rounded'>
        <Link to='/admin/userlist' className='nav-link'>
          משתמשים
        </Link>
      </li>

      <li className='nav-item rounded'>
        <Link to='/admin/productlist' className='nav-link'>
          מוצרים
        </Link>
      </li>
      <li className='nav-item rounded'>
        <Link to='/admin/orderlist' className='nav-link'>
          הזמנות
        </Link>
      </li>

      <li className='nav-item rounded'>
        <Link to='/admin/category' className='nav-link'>
          קטגוריות
        </Link>
      </li>

      <li className='nav-item rounded'>
        <Link to='/admin/sub' className='nav-link'>
          קטגוריות משנה
        </Link>
      </li>

      <li className='nav-item rounded'>
        <Link to='/admin/Coupon' className='nav-link'>
          קופונים
        </Link>
      </li>
      <li className='nav-item rounded'>
        <Link to='/wishlist' className='nav-link'>
          מוצרים שאהבתי
        </Link>
      </li>

      <li className='nav-item rounded'>
        <Link to='/admin/UserProfile' className='nav-link'>
          עדכון סיסמה
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
