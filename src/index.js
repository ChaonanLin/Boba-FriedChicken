import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// The service worker doesn't work in the development mood but
// you can use the service worker in the production mood to cache the app.
serviceWorker.register();
