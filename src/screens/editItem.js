import React, { Component } from 'react';
import { Form, Modal, Button, Container, Icon } from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
import _ from 'lodash';
const uuidv1 = require('uuid/v1');



class EditItemModal extends Component {



  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { item: this.props.item };
  }



  componentDidMount(){
    this.setState({item: this.props.item})
    console.log(this.props.item)
  }

  handleChange(event, {name, value}) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    console.log(this);
    let apiName = 'ServerlessReactExampleCRUD';
    let path = '/ServerlessReactExample';
    let newItem = {
      body: {
          "ID": uuidv1(),
          "ItemName": this.state.itemName,
          "ItemPrice": this.state.itemPrice,
          "ItemDescription": this.state.itemDescription
        }
      }
    API.put(apiName, path, newItem).then(response => {
    console.log(response)
    }).catch(error => {
        console.log(error.response)
    });
    event.preventDefault();
    this.handleClose()
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render () {
    let itemArr = this.props.item;
      return (
        <Container style={{padding: 10}}>
        {_.map(itemArr, ({ID, ItemName, ItemPrice, ItemDescription }) => (
            <Modal trigger={<Button icon onClick={this.handleOpen}> <Icon name='edit' /></Button>} closeIcon>
              <Modal.Header>Edit {ItemName}</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group unstackable widths={2}>
                    <Form.Input name='itemName' label='Item Name' placeholder={ItemName} onChange={this.handleChange}   />
                    <Form.Input name='itemPrice' label='Item Price' placeholder={ItemPrice} onChange={this.handleChange}  />
                  </Form.Group>
                  <Form.TextArea name='itemDescription' label='Item Description' placeholder={ItemDescription} onChange={this.handleChange}  />
                  <Form.Button type='submit'>Submit</Form.Button>
                </Form>
            </Modal.Content>
          </Modal>
        ))}
       </Container>
      );
    }
  }

export default EditItemModal;
