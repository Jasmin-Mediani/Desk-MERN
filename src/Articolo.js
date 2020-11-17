import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { Link, useParams } from 'react-router-dom';

const Articolo = ({ setRomanzoSelezionato, callbackArticoli }) => {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [articoloSelezionato, setArticoloSelezionato] = useState({});

    let { titoloRomanzo, nomeCategoria, titoloArticolo } = useParams();


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
                    let articles = romanzoCliccato.categorie[categoria];
                    callbackArticoli(articles);

                    for (const articolo of articles) {
                        if (articolo.titolo === titoloArticolo) {
                            setArticoloSelezionato(articolo);
                        }
                    }
                    return;
                }
            }
        }


    }, [romanzi, titoloRomanzo, nomeCategoria, setRomanzoSelezionato, callbackArticoli]);
    return (
        <div className="contenitore-articolo">
            <div className="testo-e-immagine">
                <h3>{articoloSelezionato.titolo}</h3>
                <p>{articoloSelezionato.corpoDelTesto}</p>
                <img src="" alt="" />
            </div>
            <div className="bottoni">
                <button>Articolo precedente</button>
                <button>Modifica</button>
                <button>Elimina</button>
                <button>Articolo succesivo</button>
            </div>
        </div>
    );
}

export default Articolo;