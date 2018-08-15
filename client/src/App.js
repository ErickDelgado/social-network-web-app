import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>
      <Landing/>
      <Footer/>
      <h1>My react app</h1>
      </div>
    );
  }
}

export default App;
