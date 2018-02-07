import React from 'react';
import ReactDOM from 'react-dom';

import 'ress/dist/ress.min.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
