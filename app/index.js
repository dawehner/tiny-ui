'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ApiKeyUi from './components/ApiKeyUi.js';
import FileDrop from './components/FileDrop.js';

class TinyUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiKey: null,
      image: null,
    };
    this.onSuccessfulApiKey = this.onSuccessfulApiKey.bind(this);
    this.onSuccessfulUpload = this.onSuccessfulUpload.bind(this);
  }

  onSuccessfulApiKey(apiKey) {
    this.setState({apiKey: apiKey});
  }

  onSuccessfulUpload(image) {
    this.setState({imageUrl: image});

    // fetch(url, {
    //   method: 'post',
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //   },
    //   body: 'foo=bar&lorem=ipsum'
    // })
    //   .then(json)
    //   .then(function (data) {
    //     console.log('Request succeeded with JSON response', data);
    //   })
    //   .catch(function (error) {
    //     console.log('Request failed', error);
    //   });
  }

  render() {
    let result;
    if (this.state.apiKey === null) {
      result = (
        <ApiKeyUi onSuccess={this.onSuccessfulApiKey} />
      )
    }
    else {
      result = (
        <FileDrop onUpload={this.onSuccessfulUpload}/>
      );
    }
    return result;
  }
    
}


ReactDOM.render(
  <TinyUi />,
  document.getElementById('container')
);

