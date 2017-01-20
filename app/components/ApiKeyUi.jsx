import React, { Component } from 'react';
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
    this.validateApiKey = this.validateApiKey.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSuccess(this.state.apiKey);
  }

  validateApiKey(apiKey) {
    return apiKey.length === 32;
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

ApiKeyUi.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  onSucces: React.PropTypes.func.isRequired,
};

export default ApiKeyUi;
