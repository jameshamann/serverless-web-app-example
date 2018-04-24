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
    this.deleteItem = this.deleteItem.bind(this);

    this.state = { item: this.props.item };
  }

  handleChange(event, {name, value}) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    let apiName = 'ServerlessReactExampleCRUD';
    let path = '/ServerlessReactExample';
    let editItem = {
      body: {
          "ID": this.props.item[0].ID,
          "ItemName": this.state.itemName,
          "ItemPrice": this.state.itemPrice,
          "ItemDescription": this.state.itemDescription
        }
      }
    API.put(apiName, path, editItem).then(response => {
    console.log(response)
    }).catch(error => {
        console.log(error.response)
    });
    this.handleClose()
    event.preventDefault();
  }

  deleteItem(event){
    let delItem = {
      body: {
          "ID": this.props.item[0].ID,
          "ItemName": this.state.itemName,
          "ItemPrice": this.state.itemPrice,
          "ItemDescription": this.state.itemDescription
        }
      }
    let apiName = 'ServerlessReactExampleCRUD';
    let path = "/ServerlessReactExample/object/" + this.props.item[0].ID
    API.del(apiName, path).then(response => {
    console.log(response)
    }).catch(error => {
        console.log(error.response)
    });
    this.handleClose()
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render () {
      return (
        <Container style={{padding: 10}}>
            <Modal trigger={<Button icon onClick={this.handleOpen}><Icon name='edit' /></Button>} open={this.state.modalOpen} closeIcon onClose={this.handleClose}>
              <Modal.Header>Edit</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group unstackable widths={2}>
                  <Form.Input name='itemName' label='Item Name' placeholder='Edit Item Name...' onChange={this.handleChange}  value={this.state.itemName} />
                  <Form.Input name='itemPrice' label='Item Price' placeholder='£0.00' onChange={this.handleChange}  value={this.state.itemPrice} />
                </Form.Group>
                <Form.TextArea name='itemDescription' label='Item Description' placeholder='Edit Description of the Item...' onChange={this.handleChange}  value={this.state.itemDescription} />
                  <Form.Button type='submit'>Submit</Form.Button>
                </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button icon labelPosition='left' onClick={this.deleteItem}>
              <Icon name='delete' />
                Delete Item
              </Button>
            </Modal.Actions>
          </Modal>
       </Container>
      );
    }
  }

export default EditItemModal;
