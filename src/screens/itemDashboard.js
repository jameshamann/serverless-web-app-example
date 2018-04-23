import React, { Component } from 'react';
import {Container, Card} from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';


class ItemDashboard extends Component {

  componentDidMount(){
    API.get(apiName, path).then(response => {
      console.log(response)
    });
  }


  render() {
    return (
      <div>
        <Container style={{padding: 10}}>
          <Card.Group>
              <Card>
              <Card.Content>
                <Card.Header>
                    Item Name
                </Card.Header>
                <Card.Meta>
                  Item Price
                </Card.Meta>
                <Card.Description>
                  Description of the Item
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
      </Container>
    </div>
    );
  }
}

export default ItemDashboard;
