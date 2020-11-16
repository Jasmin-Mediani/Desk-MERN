import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';


const Articoli = ({ articoli, romanzoSelezionato }) => {

    useEffect(() => {
    }, [romanzoSelezionato]);  //perché non funziona?

    return (
        <div className="container-articoli">Articoli
            <ul className="indice-articoli">
                {articoli.map((articolo, indice) => (
                    <li className="indice-di-titoli" key={indice}>{articolo.titolo}</li>
                ))}
            </ul>
        </div>
    );
}

export default Articoli;
