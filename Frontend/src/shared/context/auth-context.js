import { createContext } from "react";

export const AuthCOntext= createContext({
    isLoggedIn: false,
    Login: () =>{},
    LogOut: () =>{},


});