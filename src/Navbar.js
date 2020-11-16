import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { Link } from 'react-router-dom';

function Nav({ callbackRomanzoSelezionato }) {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [romanzoSelezionato, setRomanzoSelezionato] = useState({});

    //ogni volta che avviene una modifica ai romanzi, la navbar si refresha. 
    useEffect(() => {
    }, [romanzi]);

    function prendiCategorie(e) {
        const valoreLi = e.target.innerHTML;

        //ciclo sui romanzi e seleziono quello che ha il titolo uguale al valore del li cliccato:
        for (let i = 0; i < romanzi.length; i++) {
            const singoloRomanzo = romanzi[i];
            if (singoloRomanzo["titolo"] === valoreLi) {
                setRomanzoSelezionato(singoloRomanzo);
                //setRomanzoSelezionato prende il valore di singoloRomanzo e lo imposta in romanzoSelezionato. Ora serve che questa variabile (romanzoSelezionato) venga passata in Categorie.js, perché il componente Categorie.js deve mostrare le categorie appartenenti al romanzo che è stato selezionato. Non esiste un modo per passare la variabile da un fratello all'altro: è obbligatorio passarla all'insù, al padre App, che può passarla ai vari figli. Questo passaggio di variabile da figlio ad App si fa con una callbackFunction, che prende il valore di singoloRomanzo. ((nota: non le passo direttamente la variabile dello state "romanzoSelezionato", perché lo state è lento a caricare e mi mostra i risultati con un click di ritardo, mostra cioé i risultati del click precedente... funziona male. E' meglio usare la variabile di appoggio "singoloRomanzo" che carica subito). Quindi:

                callbackRomanzoSelezionato(singoloRomanzo); //ora questa callbackfunction in App può diventare una proprietà del tag <Navbar/>, e va assegnata alla funzione setRomanzoSelezionato di App, che a sua volta  setta il valore dentro romanzoSelezionato. In questo modo, App ha preso lo state del figlio, se lo è messo dentro il proprio state, e può passarne la variabile agli altri figli. ((vai in App, nel return, al tag <Navbar/> ))



                break;  //altrimenti cicla su tutti i romanzi e ci si sta fino a domani
            }
        }


        //---------- cambia colore al Li clicato: -------------------

        // check sugli elementi che non hanno come classe .navbar-link: se non ce l'hanno, blocca la funzione
        if (!e.target.classList.contains('navbar-link')) return;

        // aggiungi la classe "cliccato"
        e.target.classList.add('cliccato');

        // seleziona tutti i Li della navbar
        var links = document.querySelectorAll('.navbar-link');

        // Ciclo su tutti i Li
        for (var i = 0; i < links.length; i++) {

            // Se il Li è quello cliccato, continua...
            if (links[i] === e.target) continue;

            // rimuovi la classe .cliccato agli altri li del ciclo
            links[i].classList.remove('cliccato');
        }
    }


    return (
        <div className="navWrapper">
            <nav>
                <ul>
                    {romanzi.map((romanzo, indice) => (
                        // <Link to={"/categorie"}><li key={indice} onClick={prendiCategorie} className="navbar-link">{romanzo.titolo}</li></Link>
                        <li key={indice} onClick={prendiCategorie} className="navbar-link">{romanzo.titolo}</li>
                    ))}
                </ul>
            </nav>
            <div className="bottoncino"></div>
        </div>
    );
}

export default Nav;


//nota: nel map dei romanzi, al singolo romanzo ho messo index come key/chiave. In realtà ciascun romanzo avrebbe un id, accessibile con {romanzo.id}, ma con index è più univoco... e mi fa ricordare che dentro il map, il primo argomento è sempre l'oggetto singolo/esimo del ciclo, mentre il secondo argomento è sempre l'index/indice. 
