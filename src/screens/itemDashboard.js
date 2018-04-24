import React, { Component } from 'react';
import {Container, Card} from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
import _ from 'lodash';
import EditItemModal from './editItem.js'

let apiName = 'ServerlessReactExampleCRUD';
let path = '/ServerlessReactExample';

class ItemDashboard extends Component {

  constructor(props){
    super(props)
    this.state = {itemData: {}, item: {}, modalOpen: false}
  }

  getItems(){
    API.get(apiName, path).then(response => {
      console.log(response)
      this.setState({
       itemData: response.data
      });
    });
  }

  getItem(id){
  let single_path = '/ServerlessReactExample/' + id
  console.log(single_path)
  API.get(apiName, single_path).then(response => {
    console.log(response)
    this.setState({
      item: response
    })
  });
  return this.state.item
}

  componentDidMount(){
    this.getItems()
    // this.getItem("3a0806d0-4715-11e8-bef9-89bf8984b9f5")
  }


  render() {
    const itemData = this.state.itemData;
    return (
      <div>
        <Container style={{padding: 10}}>
        <Card.Group>
        {_.map(itemData, ({ID, ItemName, ItemPrice, ItemDescription }) => (
            <Card onClick={() => this.getItem(ID)}>
              <Card.Content>
                <Card.Header selectable>
                {ItemName}
                </Card.Header>
                <Card.Meta>
                  £ {ItemPrice}
                </Card.Meta>
                <Card.Description>
                    {ItemDescription}
                </Card.Description>
              </Card.Content>
              <EditItemModal item={this.state.item} />
            </Card>
          ))}
        </Card.Group>
      </Container>
    </div>
    );
  }
}

export default ItemDashboard;
