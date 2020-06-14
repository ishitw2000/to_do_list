import React from 'react';
import './App.css';
import Header from "./components/header/header";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
