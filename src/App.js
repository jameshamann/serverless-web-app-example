import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
import {Container, Label, Form, Input, Search, Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Message } from 'semantic-ui-react'
import ItemDashboard from './screens/itemDashboard'
import CreateItemModal from './screens/createItem'

Amplify.configure(aws_exports);

let apiName = 'ServerlessReactExampleCRUD';
let path = '/ServerlessReactExample';

class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    API.get(apiName, path).then(response => {
      console.log(response)
    });
  }

  render() {
    return (
      <Segment>
        <Menu>
           <Menu.Item name='home'> <Icon name="shop"/></Menu.Item>
           <Menu.Item name='Items'/>
           <Menu.Item name='aboutUs' />
           <Menu.Item><CreateItemModal /></Menu.Item>
         </Menu>
         <ItemDashboard />
      </Segment>

    );
  }
}

export default App;
