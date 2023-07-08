import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
 const navigate= useNavigate();
  const auth = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] =useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, error, sendRequest, clearError}= useHttpClient();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError]= useState()
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs);
  if(isLoginMode){
    try {
    const responseData=  await sendRequest('http://localhost:5000/api/users/login', 
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
      
        {
          'Content-Type': 'application/json'
        }
      );

            auth.logIn(responseData.user.id);
            navigate('/');
            // return redirect('/');
    } catch (err) {
          }
  }
  else {
    try {
      const responseData= await sendRequest('http://localhost:5000/api/users/signup', 
        'POST',
        JSON.stringify({
           name: formState.inputs.name.value,
           email: formState.inputs.email.value,
           password: formState.inputs.password.value
         }),
         {
          'Content-Type': 'application/json'
        },
      );
      auth.logIn(responseData.user.id);
      navigate('/');

    } catch (err) {
      
    }
  }
    //   else{ 
    //     try{
    //   setIsLoading(true);
    //   const responseData= await fetch('http://localhost:5000/api/users/signup',{
    //     method: "POST",
    //     headers:{
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify( {
    //       name: formState.inputs.name.value,
    //       email: formState.inputs.email.value,
    //       password: formState.inputs.password.value
    //     })

    //   }
    //   );
    //   const response=  await responseData.json();
    //  if(!response.ok){
    //   throw new Error(responseData.message);
    //  }
    //   // auth.login()
    //   console.log(responseData);
    // setIsLoading(false);
    //   auth.login();

    // }
    // catch(err){
    //   setIsLoading(false);
    //   setError(err.message || "Something went wrong! Please try again.");
    //   // console.log(error)
    // }}
    // console.log(formState.inputs);
    
  };

  // function errorHandler(){
  //   setError(null);
  // }

  return (

<React.Fragment>
{isLoggedIn && <Navigate/>}
<ErrorModal error={error} onClear={clearError}/>



<Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay/>}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
          element="input"
          id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && (
          <ImageUpload id="image" center onInput={inputHandler} errorText={error}/>
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
          />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
          </React.Fragment>
  );
};

export default Auth;
