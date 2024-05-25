import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RunApp from './RunApp.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RunApp />
  </React.StrictMode>
);

