import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import logo from './logo.svg';
import './App.css';
import FileDrop from './components/FileDrop';
import TypePicker from './components/TypePicker';
import DownloadButton from './components/DownloadButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as emit from './socket/emitters';
import * as listen from './socket/listeners';
import {Link} from 'react-router';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cbType: 'Protanope',
      newPdf: null,
      fileName: '',
      showLoader: false
    }

    this._pdfDaltonized = this._pdfDaltonized.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.changeCbType = this.changeCbType.bind(this);
  }

  componentDidMount() {
    listen.pdfDaltonized(this._pdfDaltonized);
  }

  _pdfDaltonized(newPdf) {
    this.setState({
      ...this.state,
      newPdf,
      showLoader: false
    })
  }

  handleFileUpload(file) {
    console.log(file);
    this.setState({
      ...this.state,
      fileName: file[0].name,
      showLoader: true
    })
    emit.uploadPDF(file[0], this.state.cbType);
  }

  changeCbType(e, value) {
    this.setState({
      ...this.state,
      cbType: value
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
          </div>
          <Grid className="main">
            <Row>
              <Col md={6}>
                <FileDrop handleFileUpload={this.handleFileUpload} />
              </Col>
              <Col md={6}>
                <Row>
                  <TypePicker changeCbType={this.changeCbType} cbType={this.state.cbType} />
                </Row>
                <Row>
                  <DownloadButton
                    daltonizedFile={this.state.newPdf}
                    fileName={this.state.fileName}
                    showLoader={this.state.showLoader}
                  />
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
