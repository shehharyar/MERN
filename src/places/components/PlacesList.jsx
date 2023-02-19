import React from 'react'
import { Card, CardHeader, Text, CardBody, Heading , CardFooter, Image } from  '@chakra-ui/react';
import PlaceItem from './PlaceItem';
import './Placeslist.css'; 
import image from '../../assets/imageUpload.png';
import Button from '../../shared/FormElements/Button';
const PlacesList = ( { items } ) => {
 if(items.length=== 0){
    return (
        <>

        <Card align='center' className='share-card'>
  <CardHeader>
    
    <Heading size='md'>
 
      No Places Found!</Heading>
  </CardHeader>
  <CardBody>
  <Image src={image}
      borderRadius='full'
      boxSize='250'
      objectFit='cover'/>
    <Text>Please Share your places.</Text>
  </CardBody>
  <CardFooter>
    <Button to={'/places/new'}> Share Place</Button>
  </CardFooter>
</Card>
        </>
    )

 }
 
 
    return (
   <ul className='place-list'>
    {items.map(place => 
    <PlaceItem 
    key={place.id}
    id={place.id}
    title={place.title}
    image={place.imageUrl}
    description= {place.description}
    address={place.address}
    creatorId={place.creator}
    coordinates={place.location}    
    />)}
   </ul>
  )
}

export default PlacesList