import React from 'react';
import Component from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.css'
import registerServiceWorker from './registerServiceWorker';
import { withAuthenticator } from 'aws-amplify-react'

const AppWithAuth = withAuthenticator(App, true);

const federated = {
  google_client_id: '847404625747-kj2ppqfv33rmg7cmgivumc743ugrnn1k.apps.googleusercontent.com',
};

ReactDOM.render(<AppWithAuth federated={federated}/>, document.getElementById('root'));
registerServiceWorker();
