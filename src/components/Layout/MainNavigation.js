import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
const authcntx2 = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authcntx2.isLoggedIn && (<li>
            <Link to='/auth'>Login</Link>
          </li>)}
           { authcntx2.isLoggedIn && (<li>
          <Link to='/profile'>Profile</Link>
          </li>)}
          {authcntx2.isLoggedIn && (<li>
            <button>Logout</button>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
