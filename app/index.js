'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ExampleApplication extends Component {

  render() {
    return (
      <p>Hello world</p>
    )
  }
    
}


ReactDOM.render(
  <ExampleApplication />,
  document.getElementById('container')
);

