import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';


const Categorie = ({ romanzoSelezionato, setRomanzoSelezionato, callbackCategorieDelRomanzo, callbackArticoli }) => {
    const [romanzi] = useContext(RomanziContext);
    const [categorieDelRomanzo, setCategorieDelRomanzo] = useState({});
    const [colore, setColore] = useState("#354b5f");

    let { titoloRomanzo } = useParams();


    useEffect(() => {
        for (const romanzo of romanzi) {
            if (romanzo.titolo === titoloRomanzo) {
                setRomanzoSelezionato(romanzo);
                return;
            }
        }
    }, [titoloRomanzo, romanzi, setRomanzoSelezionato]);

    //ogni volta che cambia il romanzoSelezionato, Categorie si refresha e le categorie assumono il colore che ho associato al romanzo. 
    useEffect(() => {
        ciclaSulleCategorie();
        settaColore();
    }, [romanzoSelezionato]);



    const ciclaSulleCategorie = () => {
        if (romanzoSelezionato && romanzoSelezionato.categorie) {

            // metto le categorie in ordine alfabetico:
            const categorieOrdinate = {};
            Object.keys(romanzoSelezionato.categorie).sort().forEach(function (key) {
                categorieOrdinate[key] = romanzoSelezionato.categorie[key];
            });

            //salvo le categorie nello state
            setCategorieDelRomanzo(categorieOrdinate);

            /* oppure con la funzione .keys() senza ciclo:

             let categorieInArray = romanzoSelezionato.categorie.keys();
             setCategorieDelRomanzo(categorieInArray);

            */
        }

    }

    // un po' di grafica: imposto il colore delle sezioni, un colore diverso per ciascun romanzo
    const settaColore = () => {
        if (romanzoSelezionato) {
            const tinta = romanzoSelezionato.coloreAssociato;  //lo prendo dal db!
            setColore(tinta); //lo metto in uno state, per poterlo poi passare inline nel tag con style={{bachgroundColor : colore }}
        }
    }


    return (  //Oggetto, prendo le chiavi che finiscono nell'array "categorieDelRomanzo" generato dalla funzione keys(), su cui mappo
        <div className="container-categorie">
            {Object.keys(categorieDelRomanzo).map(categoria => (
                <Link to={`/${romanzoSelezionato.titolo}/${categoria}`} key={categoria}>
                    <div className="categoria" style={{ backgroundColor: colore }}>
                        <div>{categoria}</div>
                        <span> ( {categorieDelRomanzo[categoria].length} )</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Categorie;