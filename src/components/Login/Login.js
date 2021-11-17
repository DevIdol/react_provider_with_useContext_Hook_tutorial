import React, { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action)=>{
  if(action.type === "USER_INPUT"){
    return{
      value: action.val,
      isValid: action.val.includes('@'),
    };
  }
  if(state.type === "INPUT_BLUR"){
    return{
      value: state.val,
      isValid: state.value.includes('@'),
    };
  }
  return {
    value: "",
    isValid: false
  }
}

const passwordReducer = (state, action)=>{
  if(action.type === "USER_INPUT"){
    return{
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if(state.type === "INPUT_BLUR"){
    return{
      value: state.val,
      isValid: state.value.trim().length > 6,
    };
  }
  return {
    value: "",
    isValid: false
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispactEmail] = useReducer(emailReducer,{
    value:"",
    isValid: false
  })
  const [passwordState, dispactPassword] = useReducer(passwordReducer,{
    value:"",
    isValid: false
  })

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
  const context = useContext(AuthContext);
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
  
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispactEmail(({
      type: "USER_INPUT",
      val:event.target.value
    }));

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispactPassword({
      type:"USER_INPUT",
      val:event.target.value
    });

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispactEmail({
      type: "INPUT_BLUR",
    })
  };

  const validatePasswordHandler = () => {
    dispactPassword({
      type: "INPUT_BLUR",
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
   
    context.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onFocus={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onFocus={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
