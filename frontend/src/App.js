import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      
      <div className="signup-page">
            <div className="signup-container">
               <form className="signup-form">
                 <h1 className="signup-heading">Sign Up</h1>
                 <h3>Your Information</h3>
                 <h3>Vehicle Information</h3>
                 <div className="signup-bottom">
                 <div id="excite">Adventure Awaits!</div>
                 <input 
                  type="submit" 
                  value= "Allons-y!"
                  className="signup-submit"
                  >
                 </input>
                 </div>
               </form>
            </div>
          </div>
      

      </div>
    );
  }
}

export default App;

// 
// <header className="App-header">
 // <img src={logo} className="App-logo" alt="logo" />
//<p>
 // Edit <code>src/App.js</code> and save to reload.
//</p>
//<a
 // className="App-link"
  //href="https://reactjs.org"
  //target="_blank"
 // rel="noopener noreferrer"
//>
  //Learn React
//</a>
 //</header>