import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';


const Categorie = ({ romanzoSelezionato, setRomanzoSelezionato, callbackCategorieDelRomanzo, callbackArticoli, categoria, setCategoria }) => {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [categorieDelRomanzo, setCategorieDelRomanzo] = useState([]);
    const [colore, setColore] = useState("#354b5f");
    const [articoli, setArticoli] = useState({});

    // const [articoletti, setArticoletti] = useState({});  //variabile di appoggio per non mettere articoli nell'url... articoli è lento perché fa parte di uno state che viene elaborato, non va messo nei Link

    let { titoloRomanzo } = useParams();


    useEffect(() => {
        for (const romanzo of romanzi) {
            if (romanzo.titolo === titoloRomanzo) {
                setRomanzoSelezionato(romanzo);
                return;
            }
        }

    }, [titoloRomanzo, romanzi]);

    //ogni volta che cambia il romanzoSelezionato, Categorie si refresha e le categorie assumono il colore che ho associato al romanzo. 
    useEffect(() => {
        ciclaSulleCategorie();
        settaColore();
    }, [romanzoSelezionato]);



    const ciclaSulleCategorie = () => {
        //le categorie sono oggetti con dentro altri oggetti. Devo pusharle in un array, così da passarlo a setCategorieDelRomanzo e averlo nello state. Se è in array, nel render posso fare un map. 
        if (romanzoSelezionato) {
            let categorieInArray = [];
            for (const key in romanzoSelezionato.categorie) {
                categorieInArray.push(key);
            }
            setCategorieDelRomanzo(categorieInArray);
        }

    }

    const cliccaCategoria = (evento) => {
        //voglio anche le categorie in quanto oggetti col loro contenuto, per metterle in uno state [oggettoContententeTutteLeCategorieDelRomanzo, hook]... 
        const oggettoContententeTutteLeCategorieDelRomanzo = romanzoSelezionato.categorie;
        var testoDelBoxCategoriaCliccato = evento.target.innerHTML;

        //tutto il contenuto della categoria... sono array di oggetti, array di articoli. 
        const articoletti = oggettoContententeTutteLeCategorieDelRomanzo[testoDelBoxCategoriaCliccato];

        setArticoli(articoletti);
        //props! callback per dare [articoli, setArticoli] ad App e poi ad Articoli.js
        callbackArticoli(articoletti);

    }


    // un po' di grafica: imposto il colore delle sezioni, un colore diverso per ciascun romanzo
    const settaColore = () => {
        if (romanzoSelezionato) {
            const tinta = romanzoSelezionato.coloreAssociato;  //lo prendo dal db!
            setColore(tinta); //lo metto in uno state, per poterlo poi passare inline nel tag con style={{bachgroundColor : colore }}
        }
    }

    //console.log(articoli);

    return (
        <div className="container-categorie">
            {categorieDelRomanzo.map(categoria => (
                <Link to={`/${romanzoSelezionato.titolo}/${categoria}`} key={categoria}><div className="categoria" style={{ backgroundColor: colore }} onClick={cliccaCategoria}>{categoria}</div></Link>
            ))}
        </div>
    );
}

export default Categorie;