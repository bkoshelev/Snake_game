import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';

const App = () => (


    <div
        className="App"
    >
        <header className="App-header">
            <img
                alt="logo"
                className="App-logo"
                src={logo}
            />
            <h1 className="App-title">
                {'Welcome to React'}
            </h1>
        </header>
        <p className="App-intro">
            {'To get started, edit '}
            <code>
                {'src/App.js'}
            </code>
            {' and save to reload.'}
        </p>
        <Game
            length={10}
            weigth={10}
        />
    </div>
);

export default App;
