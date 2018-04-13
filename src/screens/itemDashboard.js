import React, { Component } from 'react';
import {Container, Card} from 'semantic-ui-react'

class ItemDashboard extends Component {

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
