import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

let apiName = 'sampleCloudApi';
let path = '/items';
API: {
    endpoints: [
        {
            name: "MyCustomLambdaApi",
            endpoint: "https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/yourFuncName/invocations",
            service: "lambda",
            region: "us-east-1"
        }
    ]
}
class App extends Component {

  componentDidMount(){
    API.get(apiName, path, myInit).then(response => {
      console.log(response)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
