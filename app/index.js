'use babel';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Tabs, Tab } from 'react-mdl/lib';

import ApiKeyUi from './components/ApiKeyUi.js';
import FileDrop from './components/FileDrop.js';
import TinyPngResult from './components/TinyPngResult.js';

class TinyUi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiKey: null,
      ui: {
        activeTabId: 0,
        activeTab: null,
      },
      image: null,
    };
    this.onSuccessfulApiKey = this.onSuccessfulApiKey.bind(this);
    this.onSuccessfulUpload = this.onSuccessfulUpload.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.clickTab = this.clickTab.bind(this);
  }

  componentDidMount() {
    const apiKey = localStorage.getItem('tiny_ui__api_key');

    console.log(apiKey);
    if (apiKey !== null) {
      this.onSuccessfulApiKey(apiKey);
    }
  }

  onSuccessfulApiKey(apiKey) {
    this.setState({apiKey: apiKey});
    localStorage.setItem('tiny_ui__api_key', apiKey);
    this.setState({
      apiKey: apiKey,
      ui: {
        activeTabId: 1,
        activeTab: 'upload',
      }
    });
  }

  onSuccessfulUpload(image) {
    console.log(image);
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

  clickTab(tabId) {
    if (tabId === 0) {
      this.setState({
        ui: {
          activeTabId: tabId,
          activeTab: 'apiKey',
        },
      });
    }
    else if (tabId === 1) {
      this.setState({
        ui: {
          activeTabId: tabId,
          activeTab: 'upload',
        },
      });
    }
  }

  render() {
    let result;
    if (this.state.ui.activeTab === 'apiKey') {
      result = (
        <ApiKeyUi apiKey={this.state.apiKey} onSuccess={this.onSuccessfulApiKey} />
      )
    }
    else {
      result = (
        <FileDrop onUpload={this.onSuccessfulUpload}/>
      );
    }

    const tabs = (
      <div>
        <Tabs activeTab={this.state.ui.activeTabId} onChange={this.clickTab} ripple>
          <Tab>Api key</Tab>
          <Tab>Upload</Tab>
        </Tabs>
      </div>
    );

    return (
      <div>
        {tabs}
        <section>
          {result}
        </section>
      </div>
    )
    return result;
  }
    
}


ReactDOM.render(
  <TinyUi />,
  document.getElementById('container')
);

window.addEventListener('menu', e => {
  e.preventDefault();
  console.log(e);
});
