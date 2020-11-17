import React, { useState, createContext, useEffect } from 'react';
export const RomanziContext = createContext();




export const RomanziProvider = props => {
    const axios = require('axios').default;
    const [romanzi, setRomanzi] = useState([]);

    useEffect(() => {
        chiamaRomanzi();
    }, []);  //NOTA: se non metto [], la funzione chiamaRomanzi va all'infinito

    const chiamaRomanzi = async () => {
        try {
            const response = await axios.get('/db.json');
            const romanzi = response.data.data;
            setRomanzi(romanzi);
            //console.log(romanzi); //va nel try, sennò parte prima della chiamata axios e lo state risulta vuoto
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <RomanziContext.Provider value={[romanzi, setRomanzi]}>
            {props.children}
        </RomanziContext.Provider>

        // importo il MovieProvider in App così che tutti i figli di App possano accedere ai dati forniti dal provider. Per poter usare i dati del provider nei figli, però, è indispensabile importare RomanziContext, la variabile in combutta col Provider.
    );
}