import React from 'react';
import './userItem.css';
import {Card, Image, Stack, CardBody, Heading,  Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
const Dummy = ( { id, image, name, placesCount} ) => {
  return (
    <li>
        
        <Link to={`/${id}/places`}>
        <Card 
         direction={{ base: 'column', sm: 'row' }}
         overflow= "hidden"
        variant="filled"
        className= "card"
bgGradient="linear(to-l, #7928CA, #FF0080)">
            <Image
            objectFit='cover'
            borderRadius='full'
                boxSize='120px'
               className='img'

            maxW={{ base: '100%', sm: '200px' }}
             src={image}/>
   
   <Stack>
    <CardBody style={{margin: "12px"}}>
        <Heading size='md'
        color='#63B3ED'>
            {name}
        </Heading>
        <Text color= '#90CDF4'>
            {placesCount} { placesCount.length === 1 ? "Place" : "PLaces"}
        </Text>
    </CardBody>
   </Stack>
        </Card>
            </Link>
    </li>
  )
}

export default Dummy