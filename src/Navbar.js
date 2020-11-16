import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';

function Nav({ callbackRomanzoSelezionato, romanzoSelezionato }) {
    const [romanzi, setRomanzi] = useContext(RomanziContext);

    //ogni volta che avviene una modifica ai romanzi, la navbar si refresha. 
    useEffect(() => {
    }, [romanzi]);

    return (
        <div className="navWrapper">
            <nav>
                <ul>
                    {romanzi.map((romanzo, indice) => (
                        // <Link to={"/categorie"}><li key={indice} onClick={prendiCategorie} className="navbar-link">{romanzo.titolo}</li></Link>
                        <Link key={indice} to={`/${romanzo.titolo}`}><li className={romanzoSelezionato.titolo === romanzo.titolo ? "navbar-link cliccato" : "navbar-link"}>{romanzo.titolo}</li></Link>
                    ))}
                </ul>
            </nav>
            <div className="bottoncino"></div>
        </div>
    );
}

export default Nav;


//nota: nel map dei romanzi, al singolo romanzo ho messo index come key/chiave. In realtà ciascun romanzo avrebbe un id, accessibile con {romanzo.id}, ma con index è più univoco... e mi fa ricordare che dentro il map, il primo argomento è sempre l'oggetto singolo/esimo del ciclo, mentre il secondo argomento è sempre l'index/indice. 
