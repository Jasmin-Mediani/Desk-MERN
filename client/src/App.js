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
import Welcome from './Welcome';
import styled, { ThemeProvider } from 'styled-components';


const App = () => {
  const [romanzoSelezionato, setRomanzoSelezionato] = useState({});

  const StyledApp = styled.div`
    //qui va il normale css con selettori e proprietà
  `;

  return (
    <RomanziProvider>
      <StyledApp className="App">
        <div className="div-toggler">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="div-navigazione">
          <Router>
            <GlobalStyle />
            <Navbar callbackRomanzoSelezionato={setRomanzoSelezionato} romanzoSelezionato={romanzoSelezionato} />

            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route exact path="/home" component={Home}></Route>

              <Route path="/:titoloRomanzo/:nomeCategoria/:titoloArticolo/modifica-articolo" exact render={(props) => (<ModificaArticolo {...props} romanzoSelezionato={romanzoSelezionato} callbackSetRomanzoSelezionato={setRomanzoSelezionato} />)} />

              <Route path="/:titoloRomanzo/:nomeCategoria/crea-articolo" exact render={(props) => (<CreaArticolo {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />

              <Route path="/:titoloRomanzo/:nomeCategoria/:titoloArticolo" exact render={(props) => (<Articolo {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />

              <Route path="/:titoloRomanzo/:nomeCategoria" exact render={(props) => (<Articoli {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />
              <Route path="/:titoloRomanzo" exact render={(props) => (<Categorie {...props} romanzoSelezionato={romanzoSelezionato} setRomanzoSelezionato={setRomanzoSelezionato} />)} />

              {/* se gli url digitati non esistono, redirect a home: */}
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />

            </Switch>
          </Router>
        </div>
      </StyledApp>
    </RomanziProvider>
  );
}

export default App;
