import React from "react"
import {Navigate} from "react-router-dom";

const Logout = () =>{
    if (localStorage.getItem('token') !== null){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(false);
    }
    return <Navigate to='/login' />
}

export default Logout;