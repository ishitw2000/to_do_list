import React,{Component} from 'react';
import './App.css';
import Header from "./components/header/header";
import TaskList from "./containers/task_list/task_list";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import InputField from './components/inputField/input_field';

class App extends Component{
  constructor(){
    super();
    this.state = {
      body:{
        name:"unknown",
        tasks : [
          {text:"task number one"},
          {text:"task number two"},
          {text:"task number three"},
          {text:"task number four"},
          {text:"task number five"},
          {text:"task number six"},
        ],
      }
    }
  }
  render(){
    return (
      <div className="App">
        <table className="table">
          <thead>
              <Header title="To-Do-List"/>
          </thead>
          <tbody>
            <tr className="main"><TaskList tasks={this.state.body.tasks}/></tr>
            <tr className="footer"><InputField /></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
