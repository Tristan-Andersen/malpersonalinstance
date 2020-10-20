import React from 'react';
import { Router } from "@reach/router";
import Navbar from './components/navbar/navbar';
import Home from './views/home/home';
import AnimeList from './views/animelist/animelist';
import Downloads from './views/downloads/downloads';
import Anime from './views/anime/anime';
import './App.css';

const App = () => {
  return (
  <div className="App">
      <Navbar />
      <div className={'container'}>
        <Router>
          <Home path="/"/>
          <AnimeList path="/anime"/>
          <Anime path={"/anime/:animeID"}/>
          <Downloads path="/downloads"/>
        </Router>
      </div>
    </div>
  );
}

export default App;
