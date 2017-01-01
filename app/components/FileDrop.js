'use strict';

import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ImagePreview from './ImagePreview.js';

class FileDrop extends Component {

  constructor(props) {
    super(props);

    this.state = {
      draggedOver: false,
      imageUrl: null,
    };

    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragOver(e) {
    // Copied from https://stackoverflow.com/a/26580724/637596
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;

    for (let i = 0, file; file=files[i]; i++) {
      if (file.type.match(/image.*/)) {
        const reader = new FileReader();
        reader.onload = (e2) => {
          console.log(e2.target.result);
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

    let preview;

    if (this.state.imageUrl !== null) {
      preview = (<ImagePreview url={this.state.imageUrl}/>);
    }

    return (
      <div>
        <div className={className} onDragOver={this.onDragOver} onDrop={this.onDrop} />
        <div>
          {preview}
        </div>
      </div>
    )
  }

}

// FileDrop.propTypes = {
//   onUpload: React.propTypes.func.isRequired()
// };

const styles = StyleSheet.create({
  style: {
    width: '500px',
    height: '500px',
    backgroundColor: 'red',
  },

  dragOver: {
    opacity: 0.5,
  },
});

export default FileDrop;
