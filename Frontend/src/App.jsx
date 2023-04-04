import {BrowserRouter as Router , Routes, Route, } from "react-router-dom";

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
        <Route path="/" element={<Users/>}/>
        <Route path="/:userId/places" element={<UserPlaces/>}/>
        <Route path="/places/new" element={<NewPlace/>}/>
        <Route path="/places/:placeId" element={<UpdatePlace/>}/>
    </Routes>

  );
}
else{
routes=(
<Routes>

  <Route path="/" element={<Users/>}/>
  <Route path="/:userId/places" element={<UserPlaces/>}/>
  <Route path="/auth" element={<Auth/>}/>

</Routes>);
}

  return (
    
       <AuthContext.Provider value={{
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
       </AuthContext.Provider>

        );  
  
}

export default App;
