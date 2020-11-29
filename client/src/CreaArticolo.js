import React, { useEffect, useState, useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import Axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


/* CKEDITOR importazioni*/
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CreaArticolo = ({ romanzoSelezionato, setRomanzoSelezionato }) => {

    const [romanzi, setRomanzi] = useContext(RomanziContext);
    const [categoriaCorrente, setCategoriaCorrente] = useState("");
    const [titoloArticolo, setTitoloArticolo] = useState("");
    const [bodyArticolo, setBodyArticolo] = useState("");
    let history = useHistory(); //al posto di Link
    let { titoloRomanzo, nomeCategoria } = useParams();

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
                    setCategoriaCorrente(categoria);
                    return;
                }
            }
        }
    }, [romanzi, titoloRomanzo, nomeCategoria, setRomanzoSelezionato]);

    //serve un form dove inserire titolo, body e img (opzionale). Serve un bottone che quando viene cliccato fa una chiamata post dentro romanzo/categorie/categoria... e mette l'oggetto articolo.
    //Il form onSubmit chiama la funzione creaRomanzo, dentro la quale c'è la chiamata

    const prevent = (e) => {
        e.preventDefault();
    }

    const prendiTitolo = (ev) => {
        var titoloDigitato = ev.target.value;
        setTitoloArticolo(titoloDigitato);
    }

    const prendiBodyArticolo = (e) => {
        var bodyDigitato = e.target.value;
        setBodyArticolo(bodyDigitato);
    }

    const postaArticolo = async () => {
        await Axios.post('http://localhost:3002/api/aggiungi-articolo', {
            titolo: romanzoSelezionato.titolo,
            categoria: categoriaCorrente,
            titoloArticolo: titoloArticolo,
            bodyArticolo: bodyArticolo
        });

        /* Rieseguo la chiamata del pacchettone per aggiornare l'app in tempo reale */
        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        const romanzi = responseDelGet.data;
        setRomanzi(romanzi);
        history.push(`/${setRomanzoSelezionato.titolo}/${nomeCategoria}`);

    }

    return (
        <div className="crea-articolo-container" >
            <form method="POST" onSubmit={prevent}>
                <label htmlFor="inserisci-titolo">Titolo</label>
                <input type="text" id="inserisci-titolo" placeholder="inserisci il titolo" onChange={prendiTitolo} />
                <label htmlFor="inserisci-corpo-articolo">Testo dell'articolo</label>
                {/* <input id="inserisci-corpo-articolo" type="text" onChange={prendiBodyArticolo} /> */}
                {/* <textarea name="" id="" cols="30" rows="30" onChange={prendiBodyArticolo}></textarea> */}
                <CKEditor
                    editor={ClassicEditor}
                    placeholder="inserisci il testo dell'articolo"
                    onReady={editor => { }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // const datiParsati = parse(data);
                        setBodyArticolo(data);
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <button type="submit" onClick={postaArticolo}>Invia</button>
            </form>
        </div>
    )
}

export default CreaArticolo;