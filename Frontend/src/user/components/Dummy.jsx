import React from 'react';
import './userItem.css';
// import Card from '../../shared/components/UIElements/Card';
import { Card,Image, Stack, CardBody, Heading,  Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
// import Card from '../../shared/components/UIElements/Card';
const Dummy = ( { id, image, name, placesCount} ) => {
  return (
    <li>
        
        <Link to={`/${id}/places`}>

        <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={image}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{name}</Heading>

      <Text py='2'>
      {placesCount} { placesCount.length === 1 ? "Place" : "PLaces"}

      </Text>
    </CardBody>


  </Stack>
</Card>
            </Link>
    </li>
  )
}

export default Dummy;
