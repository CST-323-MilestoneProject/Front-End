import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for global styling
import './assets/styles/styles.css'; // Import custom CSS for additional styling
import Logger from './utility/Logger'; // Import custom Logger for logging

// Log initiation of the app
Logger.info('App initiation started');

// Create the root of the React application and render the App component within it
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);