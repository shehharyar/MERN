import React from 'react'
// import Dummy from '../components/Dummy';
import UsersList from '../components/UsersList';
// import {Divider, Text,Card, CardBody, CardFooter, Heading, Stack, Image, ButtonGroup,Button } from '@chakra-ui/react'
import './user.css';
const User = () => {

    const USERS= [
        {
            id: 1,
            name: "Sheharyar",
            image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            places: 3
        
        },
        {
            id: 2,
            name: "Sheharyar",
            image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            places: 1
        
        },
        {
            id: 1,
            name: "NewSouthWales",
            image: "https://media.istockphoto.com/id/951409036/photo/new-south-wales-dust-storm-near-temora.jpg?s=1024x1024&w=is&k=20&c=4kgTZKLVYrKeTbpCQhVghiNI6P6nVX-Ib43S_ATKeZ0=",
            places: 2
        
        },
    ]

  return (
      <>
      <UsersList items={USERS}/>
   
                  
                
        
    
    </>
  )
}

export default User;