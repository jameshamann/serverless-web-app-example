import React, { Component } from 'react';
import {Container, Card} from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
import _ from 'lodash';

let apiName = 'ServerlessReactExampleCRUD';
let path = '/ServerlessReactExample';

class ItemDashboard extends Component {

  constructor(props){
    super(props)
    this.state = {itemData: {}}
  }

  getItems(){
    API.get(apiName, path).then(response => {
      console.log(response)
      this.setState({
       itemData: response.data
      });
    });
  }

  componentDidMount(){
    this.getItems()
    console.log(this.getItems())
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
                <Card.Header>
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
