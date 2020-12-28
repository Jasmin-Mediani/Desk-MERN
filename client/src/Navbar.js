import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';

function Nav({ callbackRomanzoSelezionato, romanzoSelezionato }) {
    const [romanzi, setRomanzi] = useContext(RomanziContext);

    //ogni volta che avviene una modifica ai romanzi, la navbar si refresha. 
    useEffect(() => {
    }, [romanzi]);


    //Fix! ...se clicco su Home i componenti funzionano, ma nella navbar rimane selezionato l'ultimo romanzo su cui stavo lavorando, perchè rimane salvato nello state di App (RomanzoSelezionato). E' brutto. Soluzione da attuare quando clicco su HOME (.li-home):
    const annientaRomanzoSelezionato = () => {
        callbackRomanzoSelezionato({});  //callbackRomanzoSelezionato nel padre App equivale a setRomanzoSelezionato, quindi romanzoSelezionato diventa un oggetto vuoto.
    }

    console.log(romanzi);


    return (
        <div className="nav-outer">
            <ul>
                <li className="li-home" onClick={annientaRomanzoSelezionato}><Link to="/home">Home</Link></li>
            </ul>
            <div className="navWrapper">
                <nav>
                    <ul>
                        {romanzi.map((romanzo, indice) => (
                            <Link key={indice} to={`/${romanzo.titolo}`}><li className={romanzoSelezionato.titolo === romanzo.titolo ? "navbar-link cliccato" : "navbar-link"}>{romanzo.titolo}</li></Link>
                        ))}
                    </ul>
                </nav>
                <div className="bottoncino"></div>
            </div>
        </div>
    );
}

export default Nav;


//nota: nel map dei romanzi, al singolo romanzo ho messo indice come key/chiave. In realtà ciascun romanzo avrebbe un id, accessibile con {romanzo.id}, ma con index è più univoco... e mi fa ricordare che dentro il map, il primo argomento è sempre l'oggetto singolo/esimo del ciclo, mentre il secondo argomento è sempre l'index/indice. 
