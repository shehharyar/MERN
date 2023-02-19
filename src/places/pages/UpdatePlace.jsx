import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Text } from '@chakra-ui/react';
import useForm from '../../shared/hooks/form-hook';
import Button from '../../shared/FormElements/Button';
import Input from '../../shared/FormElements/Input';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import './Place.css';

const DUMMY_PLACES= [
    // {
    //     id: 1,
    //     title: "Hogia Sophia",
    //     imageUrl:       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',       
    //     description: "One of the most Old Historical Place",
    //     address: "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul, Turkey",
    //     location:{
    //         lat:41.0085858,
    //         long:28.980166
    //     },
    //     creator: "u1"
    // },
    // {
    //     id: 2,
    //     title: "Hogia Sophia",
    //     imageUrl:'https://pixabay.com/get/g5de05b354d70ef91545ea6b69e91720b8966c4652f9e159c6420110c7436916cdf56dd97d16d218da010f21d594b7608cae518803ad292e5337090acc3d5f22321df677baa2ec3baeb885935f1c3a7e1_1920.jpg',
    //     description: "One of the most Old Historical Place",
    //     address: "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul, Turkey",
    //     location:{
    //         lat:41.0085858,
    //         long:28.980166
    //     },
    //     creator: "u2"
    // },
    // {
    //     id: 3,
    //     title: "Hogia Sophia",
    //     imageUrl: "https://pixabay.com/get/g5de05b354d70ef91545ea6b69e91720b8966c4652f9e159c6420110c7436916cdf56dd97d16d218da010f21d594b7608cae518803ad292e5337090acc3d5f22321df677baa2ec3baeb885935f1c3a7e1_1920.jpg",
    //     description: "One of the most Old Historical Place",
    //     address: "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul, Turkey",
    //     location:{
    //         lat:41.0085858,
    //         long:28.980166
    //     },
    //     creator: "u3"
    // },
  ]


function UpdatePlace() {
const placeId= useParams().placeId;
const [isLoading, setIsLoading]= useState(true);

// console.log(identifiedPlace);
const [formState, inputHandler, setFormData]= useForm(
  {
    title:{
      value: "",
      isValid: false
    },
    description:{
      value: "",
      isValid: false
    }
  },
  false
  ); 
  
  const identifiedPlace= DUMMY_PLACES.find(p => p.id == placeId)
  
  useEffect(function ()
  {
    if(identifiedPlace){  
    
    setFormData( {
    title:{
      value: identifiedPlace.title,
      isValid: true
    },
    description:{
      value: identifiedPlace.description,
      isValid: true
    }
  },
  true,
    )
}
setIsLoading(false)
  },  

  [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler= event=>{
    event.preventDefault();
    console.log(formState.inputs)
  }
  
if(!identifiedPlace){

    return (
    <div className='center'>
        <Card className='share-card'>
          <CardBody>

        <Text>Couldn't Find places.</Text>
          </CardBody>
        </Card>
    </div>
    )
}

if(isLoading){
  return (
      <div>
/
        <h1>Loading....</h1>
      </div>
  );
}


  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
        id="title"
        element="input"
        type="text"
        title="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        title="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
  )
}

export default UpdatePlace;