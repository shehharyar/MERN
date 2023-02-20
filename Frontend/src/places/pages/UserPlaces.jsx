import React from 'react'
import PlacesList from '../components/PlacesList'
import { useParams } from 'react-router-dom'
const DUMMY_PLACES= [
  {
      id: 1,
      title: "Hogia Sophia",
      imageUrl:       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',       
      description: "One of the most Old Historical Place",
      address: "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul, Turkey",
      location:{
          lat:41.0085858,
          long:28.980166
      },
      creator: "u1"
  },
  {
      id: 2,
      title: "Hogia Sophia",
      // imageUrl:       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',       
      imageUrl: "https://media.istockphoto.com/id/527227696/photo/st-sophia-cathedral-istanbul-turkey.jpg?s=1024x1024&w=is&k=20&c=rT3sSYQ8H_O-AEXpMUBHdTwMNZEgzu29vQYGJZmRUOg=",
      description: "One of the most Old Historical Place",
      address: "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul, Turkey",
      location:{
          lat:41.0085858,
          long:28.980166
      },
      creator: "u2"
  },
  {
      id: 3,
      title: "Hogia Sophia",
      imageUrl: "https://pixabay.com/get/g5de05b354d70ef91545ea6b69e91720b8966c4652f9e159c6420110c7436916cdf56dd97d16d218da010f21d594b7608cae518803ad292e5337090acc3d5f22321df677baa2ec3baeb885935f1c3a7e1_1920.jpg",
      description: "One of the most Old Historical Place",
      address: "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul, Turkey",
      location:{
          lat:41.0085858,
          long:28.980166
      },
      creator: "u3"
  }
]
const UserPlaces = () => {  
  const userId= useParams().userId;
  const loadPlaces= DUMMY_PLACES.filter(place=> place.creator === userId)
    return (


    <PlacesList items={loadPlaces}/>
  )
}

export default UserPlaces