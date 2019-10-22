import React from 'react';
import ReactDOM from 'react-dom'
import App from './src/App'

if (typeof window !== 'undefined') {
  ReactDOM.render(<App/>, document.getElementById('reservationsCheckout'));
}