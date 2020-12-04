import React, { useState } from 'react';
import GlobalStyle from './globalStyles';
import Navbar from './Navbar';
import './App.css';
import { RomanziProvider } from './RomanziContext';
import Categorie from './Categorie';
import Articoli from './Articoli';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Articolo from './Articolo';
import Home from './Home';
import CreaArticolo from './CreaArticolo';
import ModificaArticolo from './ModificaArticolo';
import styled, { ThemeProvider } from 'styled-components';


const App = () => {
  const [romanzoSelezionato, setRomanzoSelezionato] = useState({});

  return (
    <RomanziProvider>
      <div className="App">
        <div className="div-toggler">
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="div-navigazione">
          <Router>
            <GlobalStyle />
            <Navbar callbackRomanzoSelezionato={setRomanzoSelezionato} romanzoSelezionato={romanzoSelezionato} />
            <Switch>

              <Route path="/:titoloRomanzo/:nomeCategoria/:titoloArticolo/modifica-articolo" exact render={(props) => (<ModificaArticolo {...props} romanzoSelezionato={romanzoSelezionato} callbackSetRomanzoSelezionato={setRomanzoSelezionato} />)} />

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
      </div>
    </RomanziProvider>
  );
}

export default App;
