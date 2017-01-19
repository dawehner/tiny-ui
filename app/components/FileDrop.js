'use strict';

import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ImagePreview from './ImagePreview.js';

const {dialog} = require('electron').remote;
const fs = require('electron').remote.require('fs');

/**
 * Converts a nodejs buffer to a browser array buffer.
 *
 * @param buf
 * @returns {ArrayBuffer}
 */
function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

class FileDrop extends Component {

  constructor(props) {
    super(props);

    this.state = {
      draggedOver: false,
      imageUrl: null,
    };

    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onDragOver(e) {
    // Copied from https://stackoverflow.com/a/26580724/637596
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  onClick(e) {
    dialog.showOpenDialog({properties: ['openFile', 'openDirectory']}, filePaths => {
      fs.readFile(filePaths[0], (err, data) => {
        if (err) {
          throw err;
        }

        this.props.onUpload(toArrayBuffer(data));
      });
    });
  }

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;

    for (let i = 0, file; file=files[i]; i++) {
      if (file.type.match(/image.*/)) {
        const reader = new FileReader();
        reader.onload = (e2) => {
          this.setState({
            // imageUrl: 'data:image/png;base64,' + btoa(e2.target.result),
            image: e2.target.result,
          });
          this.props.onUpload(e2.target.result);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }

  render() {
    const className = css(
      styles.style,
      this.state.draggedOver && styles.dragOver,
    );

    const classNameDescription = css(
      styles.uploadDescription
    );

    let preview;

    if (this.state.imageUrl !== null) {
      preview = (<ImagePreview url={this.state.imageUrl}/>);
    }

    return (
      <div>
        <div className={className} onDragOver={this.onDragOver} onDrop={this.onDrop} onClick={this.onClick}>
          <p className={classNameDescription}>Drop your .png or .jpg files here!</p>
        </div>
        {preview}
      </div>
    )
  }

}

// FileDrop.propTypes = {
//   onUpload: React.propTypes.func.isRequired()
// };

const styles = StyleSheet.create({
  style: {
    position: 'relative',
    'z-index': '16',
    width: '38rem',
    height: '14rem',
    margin: '0 auto',
    padding: '0 0 1.6rem',
    color: '#40444f',
    border: '.2rem dashed #616778',
    'border-radius': '1.5rem',
    cursor: 'pointer',
  },

  dragOver: {
    opacity: 0.5,
  },

  uploadDescription: {
    margin: 0,
    'text-align': 'center',
    'font-weight': 'bold',
    'font-size': '1.75rem',
  },
});

export default FileDrop;
