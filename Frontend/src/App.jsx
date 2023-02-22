import {BrowserRouter as Router , Routes, Route, } from "react-router-dom";

import NewPlace from "./places/pages/NewPlace";
import User from "./user/pages/User";
import React, { useState, useCallback } from "react";
import './App.css';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthCOntext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(false);
  const LogIn=useCallback(()=>{
    setIsLoggedIn(true);
  },[]);
  const LogOut=useCallback(()=>{
    setIsLoggedIn(false);
  },[]);
let routes;

if(isLoggedIn){
  routes=(

    <Routes>
        <Route path="/" element={<User/>}/>
        <Route path="/:userId/places" element={<UserPlaces/>}/>
        <Route path="/places/new" element={<NewPlace/>}/>
        <Route path="/places/:placeId" element={<UpdatePlace/>}/>
    </Routes>

  );
}
else{
routes=(
<Routes>

  <Route path="/" element={<User/>}/>
  <Route path="/:userId/places" element={<UserPlaces/>}/>
  <Route path="/auth" element={<Auth/>}/>

</Routes>);
}

  return (
    
       <AuthCOntext.Provider value={{
        isLoggedIn: isLoggedIn,
        Login: LogIn,
        LogOut: LogOut
       }}>

    <Router>
       <MainNavigation/>
         <div className="App">
     
    {routes}

      
    </div>
    </Router>
       </AuthCOntext.Provider>

        );  
  
}

export default App;
