import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { Link, useParams } from 'react-router-dom';

const Articoli = ({ romanzoSelezionato, setRomanzoSelezionato }) => {
    const [romanzi] = useContext(RomanziContext);
    let [articoli, setArticoli] = useState([]);
    let { titoloRomanzo, nomeCategoria } = useParams();


    useEffect(() => {

        for (const romanzo of romanzi) {
            if (romanzo.titolo === titoloRomanzo) {
                setRomanzoSelezionato(romanzo);
                break;
            }
        }
    }, [romanzi, titoloRomanzo, nomeCategoria, setRomanzoSelezionato]);

    useEffect(() => {

        if (romanzoSelezionato) {
            for (const categoria in romanzoSelezionato.categorie) {
                //const on obj qui non va... serve in 
                if (categoria === nomeCategoria) {
                    setArticoli(romanzoSelezionato.categorie[categoria]);
                    return;
                }
            }
        }

    }, [romanzoSelezionato, romanzi, nomeCategoria]);

    return (
        <div className="container-generale">
            {articoli.length > 0 ?
                <div className="container-articoli">Breadcrumb!
                <ul className="lista-articoli">
                        {articoli.map((articolo, indice) => (
                            <Link to={`/${romanzoSelezionato.titolo}/${nomeCategoria}/${articolo.titolo}`} key={indice}><li className="li-titolo">{articolo.titolo}</li></Link>
                        ))}
                    </ul>
                </div>

                : <div className="no-articoli"><p className="p-no-articoli">Nessun articolo presente</p></div>
            }
            <div className="div-bottoni-articoli">
                <Link to={`/${romanzoSelezionato.titolo}/${nomeCategoria}/crea-articolo`}><button className="inserisci-articolo">inserisci</button></Link>


            </div>
        </div>
    );
}



export default Articoli;
