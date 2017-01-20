import React, { Component } from 'react';
import { Textfield, Button } from 'react-mdl/lib';

function validateApiKey(apiKey) {
  return apiKey.length === 32;
}

class ApiKeyUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiKey: props.apiKey,
      valid: validateApiKey(props.apiKey),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
        valid: validateApiKey(e.target.value),
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSuccess(this.state.apiKey);
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
        <p>
          Get an API key from https://tinypng.com.
        </p>
      </form>
    );
  }

}

ApiKeyUi.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
};

export default ApiKeyUi;
