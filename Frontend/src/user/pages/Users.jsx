import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList.jsx';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.jsx';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.jsx';
import { useHttpClient } from '../../shared/hooks/http-hook.js';

const Users = () => {
  const[loadedUsers, setLoadedUsers]= useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchRequest= async () => {
      // setIsLoading(true);
        try {
         const responseData= await sendRequest("http://localhost:5000/api/users");
          
          setLoadedUsers(responseData.users);
        } 
        catch (err) { }
        // setIsLoading(false);

    };

    fetchRequest();
      }, []);
  
  

  return( 
  <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    {
      isLoading && <LoadingSpinner />
    }
    {
      !isLoading && loadedUsers && <UsersList items={loadedUsers}/>      
    }

  </React.Fragment>);
};

export default Users;
