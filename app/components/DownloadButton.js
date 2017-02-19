import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class DownloadButton extends Component {

  triggerDownload(buffer, fileName) {
    return () => {
      let csvURL = window.URL.createObjectURL(new Blob([buffer], {type: 'application/pdf'}));
      let tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', fileName.substr(0, fileName.lastIndexOf('.'))+'-daltonized.pdf');
      tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }

  render() {
    return (
      <RaisedButton
        onClick={this.triggerDownload(this.props.daltonizedFile, this.props.fileName)}
        label="Download"
        disabled={this.props.daltonizedFile === null}
      />
    );
  }

}

export default DownloadButton;