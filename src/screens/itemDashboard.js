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
}

  componentDidMount(){
    this.getItems()
    this.getItem('1')
  }


  render() {
    const itemData = this.state.itemData;
    return (
      <div>
        <Container style={{padding: 10}}>
        <Card.Group>
        {_.map(itemData, ({ID, ItemName, ItemPrice, ItemDescription }) => (
            <Card>
              <Card.Content>
                <Card.Header selectable onClick={() => this.getItem(ID)}>
                    <EditItemModal item={this.state.item} />
                    {ItemName}
                </Card.Header>
                <Card.Meta>
                  £ {ItemPrice}
                </Card.Meta>
                <Card.Description>
                    {ItemDescription}
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    </div>
    );
  }
}

export default ItemDashboard;
