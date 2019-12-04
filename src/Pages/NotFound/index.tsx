// React Imports
import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound(){
    return (
        <h1 style={{textAlign:"center"}}>
            Page not Found<br/>
            <Link to="/">Go to Home </Link>
        </h1>
    );
}