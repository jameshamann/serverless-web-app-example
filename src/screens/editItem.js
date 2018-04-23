import React, { Component } from 'react';
import { Form, Modal, Button, Container } from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
const uuidv1 = require('uuid/v1');


class EditItemModal extends Component {



  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { modalOpen: false}
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
    return (
        <Modal trigger={<Button onClick={this.handleOpen}>Edit Item</Button>} closeIcon={true} open={this.state.modalOpen} onClose={this.handleClose}>
          <Modal.Header>Add an Item</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group unstackable widths={2}>
                <Form.Input name='itemName' label='Item Name' placeholder={this.state.itemName} onChange={this.handleChange}  value={this.state.itemName} />
                <Form.Input name='itemPrice' label='Item Price' placeholder={this.state.itemPrice} onChange={this.handleChange}  value={this.state.itemPrice} />
              </Form.Group>
              <Form.TextArea name='itemDescription' label='Item Description' placeholder={this.state.itemDescription} onChange={this.handleChange}  value={this.state.itemDescription} />

              <Form.Button type='submit'>Submit</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      );
    }
  }

export default EditItemModal;
