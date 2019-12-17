import React from 'react';
import ReactDOM from 'react-dom';
import Cura from './cura';
import * as serviceWorker from './utils/serviceWorker';

ReactDOM.render(<Cura />, document.getElementById('root'));

serviceWorker.unregister();
