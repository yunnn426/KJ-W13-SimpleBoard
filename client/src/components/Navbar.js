import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import '../styles/navbar.css';

const Navbar = ({ title }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken.nickname);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        console.log(user);
    }, []);



    return (
        <nav id="navigation" className="navbar">
            <ul >
                <span >{title}</span>
                <span>{user}</span>
            </ul>
        </nav>
    )
}

export default Navbar;