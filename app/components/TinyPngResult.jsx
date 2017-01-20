import React, { Component } from 'react';
import { Button, DataTable, TableHeader } from 'react-mdl/lib';
import { StyleSheet, css } from 'aphrodite';

const { dialog } = require('electron').remote;
const fs = require('electron').remote.require('fs');

const styles = StyleSheet.create({
  imageStyle: {
    width: '80%',
  },
});

class TinyPngresult extends Component {

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined) {
        return;
      }

      fetch(this.props.tinypngResult.output.url)
        .then(res => res.arrayBuffer())
        .then((file) => {
          fs.writeFile(fileName, new Uint8Array(file));
        });
    });
  }

  render() {
    const output = this.props.tinypngResult.output;
    return (
      <div>
        <h3>Compressed image</h3>
        <figure>
          <img alt="Reduced version" className={css(styles.imageStyle)} src={output.url} />
        </figure>
        <Button raised colored onClick={this.onSave}>Save file</Button>
        <h3>Data</h3>
        <DataTable
          rows={[
            { name: 'Height', value: output.height },
            { name: 'Width', value: output.width },
            { name: 'Ratio', value: output.ratio },
            { name: 'Size', value: output.size },
            { name: 'type', value: output.type },
          ]}
        >
          <TableHeader name="name" tooltip="Name">Name</TableHeader>
          <TableHeader name="value" tooltip="value">Value</TableHeader>
        </DataTable>
      </div>
    );
  }

}

TinyPngresult.propTypes = {
  tinypngResult: React.PropTypes.shape({
    input: React.PropTypes.ignore,
    output: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
      height: React.PropTypes.number.isRequired,
      width: React.PropTypes.number.isRequired,
      ratio: React.PropTypes.number.isRequired,
      size: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default TinyPngresult;
