import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        </div>
        <Grid>
          <Row className="main">
            <TodoList />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
