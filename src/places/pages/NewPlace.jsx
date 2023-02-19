
import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
// import Input from '../../shared/components/FormElements/Input';
// import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validators'

import './Place.css';
import useForm from '../../shared/hooks/form-hook';


const NewPlace = () => {
const [formState, inputHandler] =useForm({
  title: {
  value: '',
  isValid: false
},
description: {
  value: '',
  isValid: false
},

}, false);


// console.log(formState)
 


  function SubmitHandler (event){
    event.preventDefault();
    console.log(formState.inputs)
  }


  return (
    <form className="place-form" onSubmit={SubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        title="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        title="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="Address"
        element="input"
        title="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled= {formState.isValid ? false : true}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
// import React, { useReducer, useCallback } from 'react'
// import './NewPlace.css';
// import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validators'
// import Input from '../../shared/FormElements/Input';
// // import { Button } from '@chakra-ui/react';


// const formReducer = (state, action) => {
//   switch (action.type) {
//     case 'INPUT_CHANGE':
//       let formIsValid = true;
//       for (const inputId in state.inputs) {
//         if (inputId === action.inputId) {
//           formIsValid = formIsValid && action.isValid;
//         } else {
//           formIsValid = formIsValid && state.inputs[inputId].isValid;
//         }
//       }
//       return {
//         ...state,
//         inputs: {
//           ...state.inputs,
//           [action.inputId]: { value: action.value, isValid: action.isValid }
//         },
//         isValid: formIsValid
//       };
//     default:
//       return state;
//   }
// };

// const NewPlace = () => {
//   const [formState, dispatch] = useReducer(formReducer, {
//     inputs: {
//       title: {
//         value: '',
//         isValid: false
//       },
//       description: {
//         value: '',
//         isValid: false
//       }
//     },
//     isValid: false
//   });



//   const inputHandler= useCallback((id, value, isValid)=>{ 
//     dispatch({
//       type: "INPUT_CHANGE", 
//       value: value,
//        isValid : isValid, 
//        inputId: id  
//       });
//   }, [])
// console.log(formState)  
 
//   return (
// <form className='place-form'>
//   <Input 
//   type='text' 
//   element="input" 
//   title="Title" 
//   validators={[VALIDATOR_REQUIRE()]}
//   errorText="Please enter a valid title"
//   onInput={inputHandler}
//   />

//   <Input 
//   id='description'
//   type='text' 
//   element="textarea" 
//   title="Title" 
//   validators={[VALIDATOR_MINLENGTH(5)]}
//   errorText="Please enter a valid description (at least 5 characters)"
//   onInput={inputHandler}
//   />
// {/* <Button type="submit" isDisabled={!formState.isValid}>ADD PLACE</Button> */}
// <button type='submit' disabled>Add Place</button>

// </form>
//   )
// }

// export default NewPlace;
