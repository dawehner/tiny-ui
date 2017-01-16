import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Textfield, Button } from 'react-mdl/lib';

class ApiKeyUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const apiKey = e.target.querySelector('input').value;

    if (apiKey.length === 32) {
      this.setState({valid: true});
    }

    e.preventDefault();

    if (this.state.valid) {
      this.props.onSuccess(apiKey);
    }
  }

  render() {
    const apiKeyField = this.state.valid ? (
        <Textfield
          label="Api key"
        />
      ) : (
        <Textfield
          label="Api key"
          error="Invalid API key"
        />
      );
    return (
      <form onSubmit={this.handleSubmit}>
        { apiKeyField }
        <Button raised colored>Submit</Button>
      </form>
    )
  }

}

export default ApiKeyUi;
