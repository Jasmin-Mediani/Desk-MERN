import Axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { RomanziContext } from './RomanziContext';

const Home = () => {

    const [titolo, setTitolo] = useState('');
    const [romanzi, setRomanzi] = useContext(RomanziContext);


    const salvaRomanzo = (e) => {
        e.preventDefault();
        //console.log(titolo);

        //invio il contenuto del form al back - end(index.js)
    }

    const prendiTitolo = (ev) => {
        var titoloDigitato = ev.target.value;
        setTitolo(titoloDigitato);
    }

    const creaRomanzo = async () => {
        const responseDelPost = await Axios.post('http://localhost:3002/api/aggiungi-romanzo', {
            titolo: titolo
        });
        console.log(responseDelPost);

        const responseDelGet = await Axios.get('http://127.0.0.1:3002/api/romanzi');
        //const response = await axios.get('/api/romanzi');
        const romanzi = responseDelGet.data;
        setRomanzi(romanzi);
    }

    return (
        <div className="contenitore">
            <form onSubmit={salvaRomanzo} method="POST">
                <input type="text" value={titolo} onChange={prendiTitolo} />
                <button onClick={creaRomanzo}>inserisci un romanzo</button>
            </form>
        </div>
    )
}

export default Home; 
