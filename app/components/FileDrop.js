import React, {Component} from 'react';
import {Col} from 'react-flexbox-grid';
import Dropzone from 'react-dropzone';

class FileDrop extends Component {

  render() {
    return (
      <Col md={12}>
        <Dropzone onDrop={this.props.handleFileUpload}>
          <div>drop a pdf here</div>
        </Dropzone>
      </Col>
    );
  }

}

export default FileDrop;