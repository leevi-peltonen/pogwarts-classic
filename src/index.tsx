import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import PlayerProvider from './context/PlayerContext';
import EnemyProvider from './context/EnemyContext';
import { BrowserRouter } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element!");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <CharacterProvider>
    <EnemyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EnemyProvider>
  </CharacterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
