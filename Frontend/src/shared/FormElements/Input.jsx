import { useReducer, useEffect } from 'react';
import './Input.css';
import {validate} from '../utils/validators';
const inputReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          value: action.val,
          isValid: validate(action.val, action.validators)
        };
      case 'TOUCH': {
        return {
          ...state,
          isTouched: true
        }
      }
      default:
        return state;
    }
  };
  
  

const Input = ({ id, element, title, type, className,initialValue, initialIsValid, rows, errorText,validators,onInput, placeholder}) =>{

  const [inputState, dispatch] = useReducer(inputReducer, 
    {
        value: initialValue || "", 
        isTouched: false , 
        isValid: initialIsValid || true
    } 
        );

const changeHandler = e =>{
    dispatch(
        {
            type: "CHANGE",
            val: e.target.value,
            validators: validators
        }
    )
}

const {value , isValid} = inputState;

useEffect(() => {
  onInput(id, value, isValid)

}, [id, onInput,value, isValid]);


const touchHandler = () =>{
    dispatch({
        type: "TOUCH"
    })
}

    const elemt = 
    element === "input" 
    ? 
    <input 

    id={id} type={type}
    className={className} 
    placeholder={placeholder} 
    onBlur={touchHandler}
    onChange={changeHandler} 
    value={inputState.value} /> 
    : 
    <textarea
     id={id} 
     type={type}
      rows={rows || 3} 
      onBlur={touchHandler}
      onChange={changeHandler} 
      value={inputState.value}/>

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={id}>{title}</label>
            {elemt}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    )
}

export default Input;