import classes from './ProfileForm.module.css';
import React,{useRef,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
const ProfileForm = () => {
 const pswdref= useRef();
 const authctx = useContext(AuthContext);
 const history = useHistory();
const submitHandler = (event) =>{
event.preventDefault();
const newpswd= pswdref.current.value;
fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCFx6HmXUeeUduKiRn2J61VD47jwUz9LmQ',
{
  method:'POST',
  body:JSON.stringify(
    {
      idToken: authctx.token,
      password:newpswd,
      returnSecureToken:false
    }
  ),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res =>{
  alert('Successfully updated');
  history.replace('/');
}).catch(err =>{
  alert(err.message);
})


}
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={pswdref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
