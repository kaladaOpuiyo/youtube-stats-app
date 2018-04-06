import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from '../Views/Home/Home';
import Footer from '../Views/Footer/Footer';
import Header from '../Views/Header/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Home/>
          <Footer/>
        </div>
      </Router>
    );
  }

}

export default App;
