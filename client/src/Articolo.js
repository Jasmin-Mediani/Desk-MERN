import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { useParams, useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import parse from 'html-react-parser';
import ModificaArticolo from './ModificaArticolo';

const Articolo = ({ setRomanzoSelezionato }) => {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [articoloSelezionato, setArticoloSelezionato] = useState({});
    let history = useHistory(); //al posto di Link
    let { titoloRomanzo, nomeCategoria, titoloArticolo } = useParams();

    /***************elimina articolo *****************/
    const prevent = (e) => {
        e.preventDefault();
    }

    const eliminaArticolo = async (e) => {
        await Axios.delete(`http://127.0.0.1:3002/api/delete-article/${titoloRomanzo}/${nomeCategoria}/${titoloArticolo}`);

        /* Rieseguo la chiamata del pacchettone per aggiornare l'app in tempo reale */
        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        const romanzi = responseDelGet.data;
        setRomanzi(romanzi);
        history.push(`/${setRomanzoSelezionato.titolo}/${nomeCategoria}`);

    }

    /********************** Prendi romanzo, categoria e articolo in base ai params *************************** */


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
                //const of obj qui non va... serve in 
                if (categoria === nomeCategoria) {
                    let articles = romanzoCliccato.categorie[categoria];

                    for (const articolo of articles) {
                        if (articolo.titolo === titoloArticolo) {
                            setArticoloSelezionato(articolo);
                        }
                    }
                    return;
                }
            }
        }

    }, [romanzi, titoloRomanzo, nomeCategoria, setRomanzoSelezionato, titoloArticolo]);
    return (
        <div className="contenitore-articolo">
            <div className="testo-e-immagine">
                <h2>{articoloSelezionato.titolo}</h2>
                <div className="div-corpo-testo">{articoloSelezionato.corpoDelTesto ? parse(articoloSelezionato.corpoDelTesto) : ""}</div>
                <img src="" alt="" />
            </div>
            <div className="bottoni">
                <button>articolo precedente</button>
                <form method="DELETE" onSubmit={prevent}>
                    <button className="elimina-articolo" onClick={eliminaArticolo}>elimina articolo</button>
                </form>
                <Link to={`/${titoloRomanzo}/${nomeCategoria}/${titoloArticolo}/modifica-articolo`}><button>Modifica</button></Link>
                <button>articolo successivo</button>
            </div>
        </div>
    );
}

export default Articolo;
