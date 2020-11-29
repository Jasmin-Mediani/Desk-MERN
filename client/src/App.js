import React, { useState } from 'react';
import Navbar from './Navbar';
import './App.css';
import { RomanziProvider } from './RomanziContext';
import Categorie from './Categorie';
import Articoli from './Articoli';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Articolo from './Articolo';
import Home from './Home';
import CreaArticolo from './CreaArticolo';
//import styled from 'styled-components';


const App = () => {

  /*** vedi Navbar.js riga 51: 
  ho bisogno di prendere [ romanzoSelezionato, setRomanzoselezionato ] dal figlio Navbar così da poterlo passare anche a Categorie.js ... Assegno la funzione setRomanzoSelezionato in una proprietà (callbackRomanzoSelezionato). Questa proprietà la passo coi props (come argomento) dentro il componente Navbar.js e ora posso usarla come funzione per prendere la variabile che mi serve. 
  Ora la variabile può essere passata al tag <Categorie/> e permettere a Categorie.js di usarla. */
  const [romanzoSelezionato, setRomanzoSelezionato] = useState({});
  //const [articoli, setArticoli] = useState([]);


  return (
    <RomanziProvider>
      <div className="App">
        <Router>
          <Navbar callbackRomanzoSelezionato={setRomanzoSelezionato} romanzoSelezionato={romanzoSelezionato} />
          <Switch>

            <Route path="/:titoloRomanzo/:nomeCategoria/crea-articolo" exact render={(props) => (<CreaArticolo {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />

            <Route path="/:titoloRomanzo/:nomeCategoria/:titoloArticolo" exact render={(props) => (<Articolo {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />

            <Route path="/:titoloRomanzo/:nomeCategoria" exact render={(props) => (<Articoli {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />
            <Route path="/:titoloRomanzo" exact render={(props) => (<Categorie {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />

            <Route exact path="/" component={Home}></Route>

            {/* se gli url digitati non esistono, redirect a home: */}
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />

          </Switch>
        </Router>
      </div>
    </RomanziProvider>
  );
}

export default App;
