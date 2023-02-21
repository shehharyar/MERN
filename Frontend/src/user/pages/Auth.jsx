import React from 'react';
import './Auth.css';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import Input from '../../shared/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import useForm from '../../shared/hooks/form-hook';
import Button from '../../shared/FormElements/Button';




function Auth() {
const [formState, inputHandler]= useForm({
  email: {
    value: "",
    isValid: false
  },
  password: {
    value: "",
    isValid: false
  }
}, false);

function SubmitHandler(event){
  event.preventDefault();
  console.log(formState.inputs)
}
return (
  
  <Card className='authentication'>
          <h2>LogIn Required *</h2>
         
    <form onSubmit={SubmitHandler}>
      <Input
        id="title"
        className="input"
        element="input"
        type="text"
        title="Title"
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
      <Button type="submit" className="btn" disabled={!formState.isValid}>LOGIN</Button>
        </form>  
      </Card>

  )
}

export default Auth
