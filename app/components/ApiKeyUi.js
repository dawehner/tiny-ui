import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Textfield, Button } from 'react-mdl/lib';

class ApiKeyUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiKey: props.apiKey,
      valid: this.validateApiKey(props.apiKey),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  validateApiKey(apiKey) {
    return apiKey.length === 32;
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSuccess(this.state.apiKey);
  }

  /**
   * Higher order function which produces a function that sets the current
   * field value into state.
   *
   * @param {string} fieldName
   *   The field name we change.
   *
   * @returns {function(*)}
   *   A function which sets the value in state.
   */
  onChange(fieldName) {
    return (e) => {
      this.setState({
        [fieldName]: e.target.value,
        valid: this.validateApiKey(e.target.value),
      });
    };
  }

  render() {
    const apiKeyField = this.state.valid ? (
        <Textfield
          value={this.state.apiKey}
          onChange={this.onChange('apiKey')}
          label="Api key"
        />
      ) : (
        <Textfield
          value={this.state.apiKey}
          onChange={this.onChange('apiKey')}
          label="Api key"
          error="Invalid API key"
        />
      );

    const button = this.state.valid ? (
        <Button raised colored>Submit</Button>
      ) : (
        <Button raised colored disabled>Submit</Button>
      );
    return (
      <form onSubmit={this.handleSubmit}>
        { apiKeyField }
        { button }
      </form>
    )
  }

}

export default ApiKeyUi;
