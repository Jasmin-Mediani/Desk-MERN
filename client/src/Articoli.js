import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { Link, useParams } from 'react-router-dom';


const Articoli = ({ articoli, romanzoSelezionato, setRomanzoSelezionato, callbackArticoli }) => {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [articoloCliccato, setArticoloCliccato] = useState([]);

    let { titoloRomanzo, nomeCategoria } = useParams();

    useEffect(() => {

        let romanzoCliccato;

        for (const romanzo of romanzi) {
            if (romanzo.titolo === titoloRomanzo) {
                setRomanzoSelezionato(romanzo);
                romanzoCliccato = romanzo;
                break;
            }
        }

        if (romanzoCliccato) {
            for (const categoria in romanzoCliccato.categorie) {
                //const on obj qui non va... serve in 
                if (categoria === nomeCategoria) {
                    callbackArticoli(romanzoCliccato.categorie[categoria]);
                    return;
                }
            }
        }
    }, [romanzi, titoloRomanzo, nomeCategoria, setRomanzoSelezionato, callbackArticoli]);

    return (
        <div className="container-articoli">Articoli
            <ul className="lista-articoli">
                {articoli.map((articolo, indice) => (
                    <Link to={`/${romanzoSelezionato.titolo}/${nomeCategoria}/${articolo.titolo}`} key={indice}><li className="li-titolo">{articolo.titolo}</li></Link>
                ))}
            </ul>
        </div>
    );
}

export default Articoli;
