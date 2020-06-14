import React,{Component} from 'react';
import './App.css';
import Header from "./components/header/header";
import TaskList from "./containers/task_list/task_list";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import InputField from './components/inputField/input_field';
import axios from 'axios';

class App extends Component{
  constructor(){
    super();
    this.state = {
      name:"unknown",
      pass:"none",
      tasks : [],
      lastId:0,
    }
  }
  componentDidMount(){
    axios.get("https://todolist-4aef5.firebaseio.com/"+this.state.name+"/tasks.json")
      .then(res =>{
        let r = [];
        if(res.data!==null){
          res.data.forEach(k => {
            r.push(k);
          });
          this.setState({tasks:r});
        }
        axios.get("https://todolist-4aef5.firebaseio.com/"+this.state.name+"/lastId.json")
          .then(res =>{
            this.setState({lastId:parseInt(res.data)});
          })
      })
      .catch(err =>{
        console.log(err);
      });
  }
  addTaskHandler = (text) =>{
    let tasks = [...this.state.tasks];
    let newId = parseInt(this.state.lastId)+1;
    let newTask = {id:newId,text:text};
    let url = "https://todolist-4aef5.firebaseio.com/"+this.state.name+"/tasks/"+this.state.lastId+".json";
    let url2 = "https://todolist-4aef5.firebaseio.com/"+this.state.name+"/lastId.json";
    tasks.push(newTask);
    this.setState({tasks:tasks});
    axios.put(url,newTask)
      .then(res =>{
        axios.put(url2,newId)
          .then(res =>{
            this.setState({lastId:newId});
          })
      })
      .catch(err =>{
        console.log(err);
      });
  };
  deleteTaskHandler = (event) =>{
    let id = event.target.value;
  }
  render(){
    return (
      <div className="App">
        <div className="header">
          <Header title="To-Do-List"/>
        </div>
        <div className="main overflow-auto">
          <TaskList 
            tasks={this.state.tasks}
            delete={this.deleteTaskHandler}/>
        </div>
        <div className="footer">
          <InputField click={this.addTaskHandler}/>
        </div>
      </div>
    );
  }
}

export default App;
