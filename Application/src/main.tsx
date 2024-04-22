import React from 'react'
import ReactDOM from 'react-dom/client'
import Ways from './config/ways'

import './style/global.css';
import Solo from './views/game/solo';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Solo />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
