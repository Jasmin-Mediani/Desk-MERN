import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { Link, useParams } from 'react-router-dom';


const Articoli = ({ articoli, romanzoSelezionato, setRomanzoSelezionato, callbackArticoli, setCategoria }) => {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    let { titoloRomanzo } = useParams();
    let { nomeCategoria } = useParams();

    useEffect(() => {

        let nuovoRomanzoSelezionato;

        for (const romanzo of romanzi) {
            if (romanzo.titolo === titoloRomanzo) {
                setRomanzoSelezionato(romanzo);
                nuovoRomanzoSelezionato = romanzo;
                break;
            }
        }

        if (nuovoRomanzoSelezionato) {
            console.log(nuovoRomanzoSelezionato.categorie);
            for (const categoria in nuovoRomanzoSelezionato.categorie) {
                //const on obj qui non va... serve in 
                if (categoria === nomeCategoria) {
                    setCategoria(categoria);
                    return;
                }
            }
        }
    }, [romanzi, titoloRomanzo, nomeCategoria]);  //perché non funziona?

    // console.log("ciao");

    return (
        <div className="container-articoli">Articoli
            <ul className="lista-articoli">
                {articoli.map((articolo, indice) => (
                    <li className="li-titolo" key={indice}>{articolo.titolo}</li>
                ))}
            </ul>
        </div>
    );
}

export default Articoli;
