'use babel';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Tabs, Tab } from 'react-mdl/lib';

import ApiKeyUi from './components/ApiKeyUi';
import FileDrop from './components/FileDrop';
import TinyPngResult from './components/TinyPngResult';

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
      this.setState({
        tinyPngResult: data,
        ui: {
          activeTabId: 2,
          activeTab: 'result'
        },
      });
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
    else if (tabId === 2) {
      this.setState({
        ui: {
          activeTabId: tabId,
          activeTab: 'result',
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
    else if (this.state.ui.activeTab === 'upload') {
      result = (
        <FileDrop onUpload={this.onSuccessfulUpload}/>
      );
    }
    else if (this.state.ui.activeTab === 'result') {
      result = (
        <TinyPngResult tinypngResult={this.state.tinyPngResult} />
      );
    }

    let availableTabs = [
      'Api key',
      'Upload',
    ];

    if (typeof this.state.tinyPngResult !== 'undefined') {
      availableTabs.push('Result');
    }

    const tabs = (
      <div>
        <Tabs activeTab={this.state.ui.activeTabId} onChange={this.clickTab} ripple>
          {availableTabs.map((label, key) => {
            return (<Tab key={key}>{label}</Tab>);
          })}
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
