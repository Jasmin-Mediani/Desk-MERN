import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { Link, useParams } from 'react-router-dom';

const Articoli = ({ romanzoSelezionato, setRomanzoSelezionato }) => {
    const [romanzi] = useContext(RomanziContext);
    let [articoli, setArticoli] = useState([]);
    let { titoloRomanzo, nomeCategoria } = useParams();

    const Background = "/immagini/frame-dark-mode.png";


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
                <div className="container-articoli">
                    <p className="nome-categoria"> {titoloRomanzo} / {nomeCategoria}</p>
                    <ul className="lista-articoli">
                        {articoli.map((articolo, indice) => (
                            <li className="li-titolo" style={{
                                backgroundImage: `url("${Background}")`,
                            }}><Link to={`/${romanzoSelezionato.titolo}/${nomeCategoria}/${articolo.titolo}`} key={indice}><span>{articolo.titolo}</span></Link></li>
                        ))}
                    </ul>
                    <div className="div-bottoni-articoli">
                        <Link to={`/${romanzoSelezionato.titolo}/${nomeCategoria}/crea-articolo`}><button className="inserisci-articolo">Inserisci un articolo</button></Link>
                    </div>
                </div>

                : <div className="no-articoli"><p className="p-no-articoli">Nessun articolo presente</p>

                    <div className="div-bottoni-articoli">
                        <Link to={`/${romanzoSelezionato.titolo}/${nomeCategoria}/crea-articolo`}><button className="inserisci-articolo">Inserisci un articolo</button></Link>
                    </div>
                </div>

            }

        </div>
    );
}



export default Articoli;
