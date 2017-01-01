import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

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
    const inputClass = this.state.valid ? css(styles.green) : css(styles.red);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Api key
          <input className={inputClass} type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

}

const styles = StyleSheet.create({
  red: {
    backgroundColor: 'red',
  },
  green: {
    backgroundColor: 'green',
  },
});

export default ApiKeyUi;
