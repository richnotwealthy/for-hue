import React, {Component} from 'react';
import {Col} from 'react-flexbox-grid';
import Dropzone from 'react-dropzone';
import * as emit from '../socket/emitters';

class FileDrop extends Component {

  handleFileUpload(file) {
    console.log(file);
    emit.uploadPDF(file[0]);
  }

  render() {
    return (
      <Col md={12}>
        <Dropzone onDrop={this.handleFileUpload}>
          <div>drop a pdf here</div>
        </Dropzone>
      </Col>
    );
  }
}

export default FileDrop;