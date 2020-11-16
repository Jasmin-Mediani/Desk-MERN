import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';


const Categorie = ({ romanzoSelezionato, setRomanzoSelezionato, callbackCategorieDelRomanzo, callbackArticoli }) => {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [categorieDelRomanzo, setCategorieDelRomanzo] = useState([]);
    const [colore, setColore] = useState("#354b5f");
    const [articoli, setArticoli] = useState([]);

    //ogni volta che cambia il romanzoSelezionato, Categorie si refresha e le categorie assumono il colore che ho associato al romanzo. 
    useEffect(() => {
        ciclaSulleCategorie();
        settaColore();
    }, [romanzoSelezionato]);



    const ciclaSulleCategorie = () => {
        //le categorie sono oggetti con dentro altri oggetti. Devo pusharle in un array, così da passarlo a setCategorieDelRomanzo e averlo nello state. Se è in array, nel render posso fare un map. 
        let categorieInArray = [];
        for (const key in romanzoSelezionato.categorie) {
            categorieInArray.push(key);
        }
        setCategorieDelRomanzo(categorieInArray);

    }

    const cliccaCategoria = (evento) => {
        //voglio anche le categorie in quanto oggetti col loro contenuto, per metterle in uno state [oggettoContententeTutteLeCategorieDelRomanzo, hook]... su cui ciclare per prendere la categoria selezionata e tutto il suo contenuto: 
        const oggettoContententeTutteLeCategorieDelRomanzo = romanzoSelezionato.categorie;
        var testoDelBoxCategoriaCliccato = evento.target.innerHTML;
        //console.log(testoDelBoxCategoriaCliccato);

        // se romanzoSelezionato.categorie ha una chiave che si chiama come il boxcliccato... metti quella chiave col suo valore in un oggetto. 
        const articoletti = oggettoContententeTutteLeCategorieDelRomanzo[testoDelBoxCategoriaCliccato];


        setArticoli(articoletti);

        //props! callback per dare [articoli, setArticoli] ad App e poi a Articoli.js
        callbackArticoli(articoletti);

    }


    // un po' di grafica: imposto il colore delle sezioni, un colore diverso per ciascun romanzo
    const settaColore = () => {
        const tinta = romanzoSelezionato.coloreAssociato;  //lo prendo dal db!
        setColore(tinta); //lo metto in uno state, per poterlo poi passare inline nel tag con style={{bachgroundColor : colore }}
    }

    //console.log(articoli);

    return (
        <div className="container-categorie">
            <div className="container-inner-centrato">
                {categorieDelRomanzo.map(categoria => (
                    <div className="categoria" style={{ backgroundColor: colore }} key={categoria} onClick={cliccaCategoria}>{categoria}</div>
                ))}
            </div>
        </div>
    );
}

export default Categorie;
