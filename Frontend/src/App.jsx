import {BrowserRouter as Router , Routes, Route, Navigate } from "react-router-dom";

import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import React, { useState, useCallback } from "react";
import './App.css';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [token, setToken]= useState(null);
  const [userId, setUserId]= useState(false);
  const LogIn=useCallback((uid,token)=>{
    setToken(token);
    setUserId(uid);
  },[]);
  const LogOut=useCallback(()=>{
    setToken(null);
    setUserId(null);
  },[]);
  console.log(token)
let routes;

if(token){
  routes=(

    <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path="/:userId/places" element={<UserPlaces/>}/>
        <Route path="/places/new" element={<NewPlace/>}/>
        <Route path="/places/:placeId" element={<UpdatePlace/>}/>
        {/* <Route path='/' element={<Navigate replace to='/' />} /> */}
    </Routes>

  );
}
else{
routes=(
<Routes>

  <Route path="/" element={<Users/>}/>
  <Route path="/:userId/places" element={<UserPlaces/>}/>
  <Route path="/auth" element={<Auth/>}/>
  {/* <Route path='/' element={<Navigate replace to='/' />} /> */}

</Routes>);
}

  return (
    
       <AuthContext.Provider value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        logIn: LogIn,
        logOut: LogOut
       }}>

    <Router>
       <MainNavigation/>
         <div className="App">
     
    {routes}

      
    </div>
    </Router>
       </AuthContext.Provider>

        );  
  
}

export default App;
