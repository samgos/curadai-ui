import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './utils/serviceWorker'
import { StateProvider } from './state'
import Cura from './cura'

ReactDOM.render(
  <StateProvider> <Cura /> </StateProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
