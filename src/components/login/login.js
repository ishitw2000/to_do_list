import React, { Component } from 'react';
class login extends Component{
    constructor(){
        super();
        this.state = {
            username : "",
            password : "",
        };
    }
    passwordChangeHandler = (event) =>{
        this.setState({password:event.target.value});
    }
    usernameChangeHandler = (event) =>{
        this.setState({username:event.target.value});
    }
    clickActionHandler = () =>{
        const u = this.state.username;
        const p = this.state.password;
        this.setState({username:"" , password:""});
        const f = () =>{
            this.props.click(u,p);
        };
        f();
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <input 
                            onChange={this.usernameChangeHandler} 
                            value={this.state.username} 
                            placeholder="Enter your username"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input 
                                onChange={this.passwordChangeHandler}
                                value={this.state.password}
                                placeholder="Enter your password"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button 
                            onClick={this.clickActionHandler}>LOGIN</button>
                        <button
                            onClick={this.props.signup}>SIGN UP</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default login;
