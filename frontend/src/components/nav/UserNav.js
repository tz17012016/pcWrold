import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => (
  <nav>
    <ul className='nav flex-column hoverComponnent'>
      <li className='nav-item rounded'>
        <Link to='/profile' className='nav-link'>
          פרופיל מישתמש
        </Link>
      </li>
      <li className='nav-item rounded'>
        <Link to='/history' className='nav-link'>
          היסטוריית קנייות
        </Link>
      </li>
      <li className='nav-item rounded'>
        <Link to='/wishlist' className='nav-link'>
          מוצרים שאהבתי
        </Link>
      </li>
      <li className='nav-item rounded'>
        <Link to='/UserProfile' className='nav-link'>
          שינוי סיסמה
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
