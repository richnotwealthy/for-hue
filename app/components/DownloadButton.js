import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

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
      <div>
        {this.props.showLoader && (<LinearProgress mode="indeterminate" />)}
        <RaisedButton
          onClick={this.triggerDownload(this.props.daltonizedFile, this.props.fileName)}
          label="Download"
          disabled={this.props.daltonizedFile === null || this.props.showLoader}
          primary={true}
          labelStyle={{ fontSize: '18px' }}
        />
      </div>
    );
  }

}

export default DownloadButton;