import { useState, useRef} from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailref = useRef();
  const pswdref= useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) =>{
    event.preventDefault();
    setIsLoading(true);
    const enteredemail= emailref.current.value;
    const enteredpswd= pswdref.current.value;
    let url;
    if(isLogin){
     url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFx6HmXUeeUduKiRn2J61VD47jwUz9LmQ';
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFx6HmXUeeUduKiRn2J61VD47jwUz9LmQ';
    }
      fetch(url,
      { method:'POST',
        body:JSON.stringify({
          email:enteredemail,
          password:enteredpswd,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type': 'application/json'
        }

      }).then((res) =>{
        setIsLoading(false);
        if(res.ok){
        return res.json();

        }
        else {
          res.json().then((data) =>{
           let errormessage = 'Authentication failed !';
           if(data && data.error && data.error.message){
           errormessage=data.error.message;
           }
            
          alert(errormessage);
          });
        }
      }).then((data) =>{
       console.log(data);
      }).catch((err) =>{
        alert(err.message);
      });
    
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailref}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={pswdref}/>
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
