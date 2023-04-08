import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList.jsx';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.jsx';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.jsx';

const Users = () => {
  const[isLoading, setIsLoading]= useState(false);
  const[loadedUsers, setLoadedUsers]= useState();
  const[error, setError]= useState();

  useEffect(() => {
    const sendRRequest= async () => {
      setIsLoading(true);
        try {
          const response= await fetch("http://localhost:5000/api/users");
          const responseData= await response.json();
          if(!response.ok){
            throw new Error(responseData.message);
          }

          setLoadedUsers(responseData.users);
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);

    };

    sendRRequest();
  }, [])
  
  const errorHandler= ()=>{
    setError(null);
  }

  return( 
  <React.Fragment>
    <ErrorModal error={error} onClear={errorHandler}/>
    {
      isLoading && <LoadingSpinner />
    }
    {
      !isLoading && loadedUsers && <UsersList items={loadedUsers}/>      
    }

  </React.Fragment>);
};

export default Users;
