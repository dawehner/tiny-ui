import React, { Component } from 'react';
import { Button, DataTable, TableHeader } from 'react-mdl/lib';

class TinyPngresult extends Component {

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
  }

  render() {
    let output = this.props.tinypngResult.output;
    return (
      <div>
        <h3>Compressed image</h3>
        <img src={output.url}/>
        <Button raised colored onClick={this.onSave}>Save file</Button>
        <h3>Data</h3>
        <DataTable
          rows={[
            {name: "Height", value: output.height},
            {name: "Width", value: output.width},
            {name: "Ratio", value: output.ratio},
            {name: "Size", value: output.size},
            {name: "type", value: output.type},
          ]}
        >
          <TableHeader name="name" tooltip="Name">Name</TableHeader>
          <TableHeader name="value" tooltip="value">Value</TableHeader>
        </DataTable>
      </div>
    )
  }

}

export default TinyPngresult;
