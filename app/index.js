'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ApiKeyUi from './components/ApiKeyUi.js';
import FileDrop from './components/FileDrop.js';
import TinyPngResult from './components/TinyPngResult.js';

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

    const basicAuth = 'api:' + this.state.apiKey;
    fetch('https://api.tinify.com/shrink', {
      method: 'post',
      headers: {
        "Authorization": "Basic " + btoa(basicAuth),
      },
      body: image,
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
    });
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

