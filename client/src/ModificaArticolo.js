import React, { useEffect, useState, useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import Axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


/* CKEDITOR importazioni*/
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const ModificaArticolo = ({ romanzoSelezionato, callbackSetRomanzoSelezionato }) => {

    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [categoriaCorrente, setCategoriaCorrente] = useState("");
    const [nuovoTitoloArticolo, setNuovoTitoloArticolo] = useState("");
    const [bodyArticolo, setBodyArticolo] = useState("");
    const [articoloSelezionato, setArticoloSelezionato] = useState({});
    let history = useHistory(); //al posto di Link
    let { titoloRomanzo, nomeCategoria, titoloArticolo } = useParams();

    /********************** Prendi romanzo, categoria e articolo in base ai params *************************** */


    useEffect(() => {

        let romanzoCliccato;

        for (const romanzo of romanzi) {
            if (romanzo.titolo === titoloRomanzo) {
                callbackSetRomanzoSelezionato(romanzo);
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
                            setNuovoTitoloArticolo(titoloArticolo);
                            setBodyArticolo(articolo.corpoDelTesto);
                        }
                    }
                    return;
                }
            }
        }


    }, [romanzi, titoloRomanzo, nomeCategoria, callbackSetRomanzoSelezionato, titoloArticolo]);

    //serve un form dove inserire titolo, body e img (opzionale). Serve un bottone che quando viene cliccato fa una chiamata post dentro romanzo/categorie/categoria... e mette l'oggetto articolo.
    //Il form onSubmit chiama la funzione creaRomanzo, dentro la quale c'è la chiamata

    const prevent = (e) => {
        e.preventDefault();
    }

    const prendiTitolo = (ev) => {
        var titoloDigitato = ev.target.value;
        setNuovoTitoloArticolo(titoloDigitato);
    }

    const prendiBodyArticolo = (e) => {
        var bodyDigitato = e.target.value;
        setBodyArticolo(bodyDigitato);
    }

    const postaArticolo = async () => {
        await Axios.post('http://localhost:3002/api/modifica-articolo', {
            titolo: romanzoSelezionato.titolo,
            categoria: nomeCategoria,
            vecchioTitoloArticolo: titoloArticolo,
            bodyArticolo: bodyArticolo,
            nuovoTitoloArticolo: nuovoTitoloArticolo,
        });

        /* Rieseguo la chiamata del pacchettone per aggiornare l'app in tempo reale */
        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        const romanzi = responseDelGet.data;
        setRomanzi(romanzi);
        history.push(`/${callbackSetRomanzoSelezionato.titolo}/${nomeCategoria}`);
    }

    return (
        <div className="crea-articolo-container" >
            <form method="POST" onSubmit={prevent}>
                <label htmlFor="inserisci-titolo">Titolo</label>
                <input type="text" id="inserisci-titolo" placeholder="inserisci il titolo" onChange={prendiTitolo} value={nuovoTitoloArticolo} />
                <label htmlFor="inserisci-corpo-articolo">Testo dell'articolo</label>
                <CKEditor
                    //data si comporta come value nell'editor: è il valore negli input/textarea
                    data={bodyArticolo}
                    editor={ClassicEditor}
                    placeholder="inserisci il testo dell'articolo"
                    onReady={editor => { }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // const datiParsati = parse(data);
                        setBodyArticolo(data);
                    }}
                />
                <button type="submit" onClick={postaArticolo}>Invia</button>
            </form>
        </div>
    )
}

export default ModificaArticolo;