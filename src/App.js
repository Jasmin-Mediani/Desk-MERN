import React, { useState } from 'react';
import Navbar from './Navbar';
import './App.css';
import { RomanziProvider } from './RomanziContext';
import Categorie from './Categorie';
import Articoli from './Articoli';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
//import styled from 'styled-components';


function App() {

  /*** vedi Navbar.js riga 51: 
  ho bisogno di prendere [ romanzoSelezionato, setRomanzoselezionato ] dal figlio Navbar così da poterlo passare anche a Categorie.js ... Assegno la funzione setRomanzoSelezionato in una proprietà (callbackRomanzoSelezionato). Questa proprietà la passo coi props (come argomento) dentro il componente Navbar.js e ora posso usarla come funzione per prendere la variabile che mi serve. 
  Ora la variabile può essere passata al tag <Categorie/> e permettere a Categorie.js di usarla. */
  const [romanzoSelezionato, setRomanzoSelezionato] = useState({});
  const [articoli, setArticoli] = useState([]);

  return (
    <RomanziProvider>
      <div className="App">
        {/* <Categorie romanzoSelezionato={romanzoSelezionato} callbackArticoli={setArticoli} />
        <Articoli articoli={articoli} romanzoSelezionato={romanzoSelezionato} /> */}

        <Router>
          <Navbar callbackRomanzoSelezionato={setRomanzoSelezionato} romanzoSelezionato={romanzoSelezionato} />
          <Switch>
            <Route path="/:titoloRomanzo" render={(props) => (<Categorie {...props} romanzoSelezionato={romanzoSelezionato} callbackArticoli={setArticoli} setRomanzoSelezionato={setRomanzoSelezionato} />)} />
            {/* <Route path="/:titoloRomanzo/:nomeCategoria" component={Articoli} /> */}
          </Switch>
        </Router>
      </div>
    </RomanziProvider>
  );
}

export default App;
