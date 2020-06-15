import React,{PureComponent} from 'react';
import './App.css';
import Header from "./components/header/header";
import TaskList from "./containers/task_list/task_list";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import InputField from './components/inputField/input_field';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import axios from 'axios';

class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      name:"",
      pass:"",
      tasks : [],
      lastId:0,
      authenticated:0,
      // authenticated=0 for Login page
      // authenticated=1 for SignUp page
      // authenticated=2 for show tasks
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
  toggleSignOut = () =>{
    this.setState({
      name:"",
      pass:"",
      tasks : [],
      lastId:0,
      authenticated:0,
    });
  }
  toggleSignUp = () =>{
    this.setState({authenticated:1});
  }
  userLogin = (name,pass) =>{
    let url = "https://todolist-4aef5.firebaseio.com/";
    axios.get(url+name+".json")
      .then(res =>{
        if(pass===res.data.password){
          let lastId = parseInt(res.data.lastId);
          this.setState({name:name,pass:pass,lastId:lastId,tasks:res.data.tasks,authenticated:2});
        }
        else{
          console.log("Wrong password!");
        }
      });
  }
  makeNewUser = (name,pass) =>{
    let url = "https://todolist-4aef5.firebaseio.com/";
    let users = 0;
    axios.get(url+"numUsers.json")
      .then(res =>{
        users = parseInt(res.data);
        let user = {password:pass,tasks:[],lastId:0};
        axios.put(url+name+".json",user)
          .then(res =>{
            axios.put(url+"numUsers.json",parseInt(users)+1);
            this.setState({name:name,pass:pass,authenticated:2,lastId:0});
        });
      });
  }
  addTaskHandler = (text) =>{
    let tasks = [];
    if(this.state.tasks){
      tasks = [...this.state.tasks];
    }
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
  deleteTaskHandler = (id) =>{
    let newTasks = [];
    let oldtasks = [...this.state.tasks];
    let oldId = this.state.lastId;
    oldtasks.forEach(t =>{
      if(parseInt(t.id)!==parseInt(id)){
        newTasks.push(t);
      }
    });
    let url = "https://todolist-4aef5.firebaseio.com/"+this.state.name+"/tasks.json";
    let url2 = "https://todolist-4aef5.firebaseio.com/"+this.state.name+"/lastId.json";
    axios.put(url,newTasks)
      .then(res =>{
        axios.put(url2,parseInt(oldId-1))
          .then(res =>{
            this.setState({tasks:newTasks});
            this.setState({lastId:oldId-1});
          });
      })
  }
  render(){
    return (
      <div className="App">
        <div className="header">
          <Header title="To-Do-List"/>
          {this.state.authenticated===2 ? (
            <div 
              className="text-danger" 
                style={{"textDecoration":"underline"}}>
                  Welcome, {this.state.name}<span>  </span>
                  <button className="btn btn-light" onClick={this.toggleSignOut}>Sign-Out</button>
            </div>
          ) : null}
        </div>

        {this.state.authenticated===0 ?
         <Login 
            click={this.userLogin} 
            signup={this.toggleSignUp}/> : null}

        {this.state.authenticated===1 ?
         <SignUp signup={this.makeNewUser}/> : null}

        <div className="main overflow-auto">
        {this.state.authenticated===2 ? 
          <TaskList 
          tasks={this.state.tasks}
          delete={this.deleteTaskHandler}/>
        : null}
        </div>
        <div className="footer">
          {this.state.authenticated===2 ? 
          <InputField click={this.addTaskHandler}/>
          :null}
        </div>
      </div>
    );
  }
}

export default App;
