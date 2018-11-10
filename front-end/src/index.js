import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import '../src/styles/base.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
