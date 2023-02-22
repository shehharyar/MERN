// import React from 'react';
import { useContext, useState } from 'react';
import './Auth.css';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import Input from '../../shared/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import useForm from '../../shared/hooks/form-hook';
import Button from '../../shared/FormElements/Button';
import { AuthCOntext } from '../../shared/context/auth-context';




function Auth() {
  const [isLoginMode, setIsLoginMode]= useState(true);
  const authCtx= useContext(AuthCOntext);
  const [formState, inputHandler, setFormData]= useForm({
  email: {
    value: "",
    isValid: false
  },
  password: {
    value: "",
    isValid: false
  }
}, false);


function swicthModeHandler(){
if(!isLoginMode){
  setFormData({
    ...formState.inputs,
    name: undefined
  },
  formState.inputs.email.isValid && formState.inputs.password.isValid);
}
else{
  setFormData(
    {
      ...formState.inputs,
      name:{
        value: '',
        isValid: false
      },
    },
    false
  );
}

  setIsLoginMode(prevMode => !prevMode)
}

console.log(formState.inputs)

const SubmitHandler= event =>{
  event.preventDefault();
  console.log(formState.inputs)
  authCtx.Login();
}
return (
  
  <Card className='authentication'>
          <h1>LogIn Required *</h1>
         <hr />
    <form onSubmit={SubmitHandler}>
     {!isLoginMode && <Input
        id="name"
        className={`input ${!formState.inputs.email.isValid ? " error ":null }`}
        element="input"
        type="text"
        title="Your Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a name."
        onInput={inputHandler}
      />}
      <Input
        id="email"
        className={`input ${!formState.inputs.email.isValid ? " error ":null }`}
        element="input"
        type="eamil"
        title="Email"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid email address."
        onInput={inputHandler}
      />
      <Input
        id="password"
        className="input"
        element="input"
        type="password"
        title="Password"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid password. at least 5 characters!"
        onInput={inputHandler}
      />

      <div className='btn_container'>

      <Button type="submit" className="btn" disabled={!formState.isValid}>
        {isLoginMode ? "LOGIN" : "SIGN UP"}</Button>
      </div>

        </form>
        <div className='btn_container'>
          
      <Button type="submit"  onClick={swicthModeHandler} className="btn-2">SWITCH TO {isLoginMode ? "SIGN UP" : "SIGN IN"}</Button>
          </div>  

      </Card>

  )
}

export default Auth
