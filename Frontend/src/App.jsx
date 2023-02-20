import {BrowserRouter as Router , Routes, Route, } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import User from "./user/pages/User";
// import { ChakraProvider } from "@chakra-ui/react";
import './App.css';
// import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import NavLinks from "./shared/components/Navigation/Navbar";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";

function App() {

  return (
    <div className="App">
      {/* <MainNavigation/>
       */}
    <Router>
       <MainNavigation/>
      <Routes>
        <Route path="/" element={<User/>}/>
        <Route path="/:userId/places" element={<UserPlaces/>}/>
        <Route path="/places/new" element={<NewPlace/>}/>
        <Route path="/places/:placeId" element={<UpdatePlace/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </Router>

        
{/* </ChakraProvider> */}
    </div>
  );  
  
}

export default App;
