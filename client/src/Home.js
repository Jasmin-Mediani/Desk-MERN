import Axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';
import { Link } from 'react-router-dom';

const Home = () => {

    const [titolo, setTitolo] = useState('');
    const [titoloDaEliminare, setTitoloDaEliminare] = useState("");
    const [romanzi, setRomanzi] = useContext(RomanziContext);


    const salvaRomanzo = (e) => {
        e.preventDefault();
        setTitolo("");
    }

    const prendiTitolo = (ev) => {
        var titoloDigitato = ev.target.value;
        setTitolo(titoloDigitato);
    }

    const prendiTitoloPerEliminarlo = (ev) => {
        var titoloDigitato = ev.target.value;
        setTitoloDaEliminare(titoloDigitato);
    }


    /**************** CREA ROMANZO, ELIMINA ROMANZO **************/

    const creaRomanzo = async () => {
        const responseDelPost = await Axios.post('http://localhost:3002/api/aggiungi-romanzo', {
            titolo: titolo
        });
        console.log(responseDelPost);

        /* Rieseguo la chiamata del pacchettone per aggiornare l'app in tempo reale */
        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        const romanzi = responseDelGet.data;
        setRomanzi(romanzi);
    }

    const eliminaRomanzo = async (e) => {
        // window.confirm("Confermi di voler cancellare questo romanzo?");
        e.preventDefault();
        await Axios.delete(`http://127.0.0.1:3002/api/delete-romanzo/${titoloDaEliminare}`);
        setTitoloDaEliminare("");


        /* Rieseguo la chiamata del pacchettone per aggiornare l'app in tempo reale */
        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        const romanzi = responseDelGet.data;
        setRomanzi(romanzi);
    }

    return (
        <div className="contenitore-home">

            <form onSubmit={salvaRomanzo} method="POST">
                <input className="aggiungi-un-romanzo" type="text" value={titolo} onChange={prendiTitolo} placeholder="titolo del romanzo da aggiungere" />
                <Link to={`/${titolo}`}><button className="inserisci-romanzo" onClick={creaRomanzo}>inserisci</button></Link>
            </form>

            <form onSubmit={eliminaRomanzo} method="DELETE">
                <input className="elimina-un-romanzo" type="text" value={titoloDaEliminare} onChange={prendiTitoloPerEliminarlo} placeholder="titolo del romanzo da eliminare" />
                <button className="elimina-romanzo" onClick={eliminaRomanzo}>elimina</button>
            </form>

        </div>
    )
}

export default Home; 
