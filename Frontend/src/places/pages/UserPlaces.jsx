import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const UserPlaces = () => {
  const userId = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  console.log(userId)
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        console.log(responseData)
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces()
  }, [sendRequest, userId]);

const placeDeletedHandler = (deletedPlaceId) =>{
  setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
}

  // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return (
  <>
  <ErrorModal error={error} onClear={clearError}/>
{isLoading && (
<div className="center">
<LoadingSpinner asOverlay/>
</div>
)}
  {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
  </>
  );
}

export default UserPlaces;
