import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import Axios from 'axios';


const Categorie = ({ romanzoSelezionato, setRomanzoSelezionato, callbackCategorieDelRomanzo }) => {
    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [categorieDelRomanzo, setCategorieDelRomanzo] = useState(null);
    const [colore, setColore] = useState("#354b5f");

    const [categoria, setCategoria] = useState("");
    const [categoriaDaEliminare, setCategoriaDaEliminare] = useState("");

    let { titoloRomanzo } = useParams();


    const salvaCategoria = (e) => {
        e.preventDefault();
        setCategoria("");
    }

    const prendiCategoria = (ev) => {
        var categoriaDigitata = ev.target.value;
        setCategoria(categoriaDigitata);
    }

    const prendiCategoriaPerEliminarla = (ev) => {
        var categoriaDigitata = ev.target.value;
        setCategoriaDaEliminare(categoriaDigitata);
    }


    /************* crea categoria ***************/
    const creaCategoria = async () => {
        const responseDelPost = await Axios.post('http://localhost:3002/api/aggiungi-categoria', {
            titolo: romanzoSelezionato.titolo,
            categoria: categoria
        });

        /* Rieseguo la chiamata del pacchettone per aggiornare l'app in tempo reale */
        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        const romanzi = responseDelGet.data;
        console.log(romanzi);
        setRomanzi(romanzi);
    }

    /***********elimina categoria *****************/
    const eliminaCategoria = async (e) => {
        // window.confirm("Confermi di voler cancellare questa categoria?");
        e.preventDefault();
        await Axios.delete(`http://127.0.0.1:3002/api/delete-categoria/${titoloRomanzo}/${categoriaDaEliminare}`);
        setCategoriaDaEliminare("");


        /* Rieseguo la chiamata del pacchettone per aggiornare l'app in tempo reale */
        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        const romanzi = responseDelGet.data;
        setRomanzi(romanzi);
    }


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
        <div className="container-generale-categorie">
            {/*  check per evitare lo sfarfallio (lo state è lento a caricarsi e si vede per un millesimo di secondo il contenuto di un altro componente): se le categorie non hanno nulla (null) mostra un div vuoto velocissimo; se dentro c'è roba esegui il resto del codice */}
            {categorieDelRomanzo === null ? <div className="vuoto" /> : (Object.keys(categorieDelRomanzo).length > 0 ?
                <div className="container-categorie">
                    {Object.keys(categorieDelRomanzo).map(categoria => (
                        <Link to={`/${romanzoSelezionato.titolo}/${categoria}`} key={categoria}>
                            <div className="categoria" style={{ backgroundColor: colore }}>
                                <div>{categoria}</div>
                                <span> ( {categorieDelRomanzo[categoria].length} )</span>
                            </div>
                        </Link>
                    ))}
                </div> : <div className="no-categorie"><p className="p-no-categorie">Nessuna categoria</p></div>)
            }
            <div className="div-bottoni-categorie">
                <form method="POST" onSubmit={salvaCategoria}>
                    <input className="aggiungi-una-categoria" type="text" placeholder="categoria da aggiungere" onChange={prendiCategoria} value={categoria} />
                    <button className="inserisci-categoria" onClick={creaCategoria}>inserisci</button>
                </form>

                <form method="DELETE" onSubmit={eliminaCategoria}>
                    <input className="elimina-una-categoria" type="text" placeholder="categoria da cancellare" value={categoriaDaEliminare} onChange={prendiCategoriaPerEliminarla} />
                    <button className="elimina-categoria" onClick={eliminaCategoria} >elimina</button>
                </form>
            </div>
        </div>
    );
}

export default Categorie;