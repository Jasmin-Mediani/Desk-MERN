import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {

    return (
        <div className="contenitore-welcome">
            <p>Benvenuto</p>
            <div>LOGO</div>
            <Link to="/home"><button>Entra</button></Link>
        </div>
    )
}

export default Welcome;