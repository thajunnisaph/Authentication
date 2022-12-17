import { Switch, Route, Redirect } from 'react-router-dom';
import React, {useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/AuthContext';

function App() {
 const authcntx1 = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
{!authcntx1.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
    <Route path='/profile'>
        {authcntx1.isLoggedIn &&  <UserProfile />}
        {!authcntx1.isLoggedIn && <Redirect to='/auth'/>}
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
