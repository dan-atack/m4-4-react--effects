import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { GameProvider } from '../src/components/GameContext';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <GameProvider>
        <App />
    </GameProvider>, 
    rootElement);
