import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {

    const Background = "/immagini/frame-dark-mode.png";

    return (
        <div className="contenitore-welcome">
            <p className="p-welcome">Benvenuto</p>
            <div className="welcome-logo"
                style={{
                    //Ho dovuto farlo qui perché react non compila l'immagine in bacground nello stylesheet!
                    backgroundImage: `url("${Background}")`,
                    backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: '300px',
                    minWidth: '300px',
                    height: '70vh',
                    width: '55vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}><span>APPLICAZIONE</span></div>

            <Link to="/home"><button className="bottone-entra">Entra</button></Link>
        </div >
    )
}

export default Welcome;