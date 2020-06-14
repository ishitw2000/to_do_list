import React, { Component } from 'react';

class input_field extends Component{
    constructor(){
        super();
        this.state = {
            task:"",
        };
    };
    changedTaskHandler = (event) =>{
        let t = event.target.value;
        this.setState({task:t});
    }
    clickListener = () =>{
        let task = this.state.task;
        this.setState({task:""});
        const f = () =>{
            this.props.click(task)
        };
        f();
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <input onChange={this.changedTaskHandler} value={this.state.task}/>
                    </div>
                    <div className="col-3">
                        <button onClick={this.clickListener}>ADD</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default input_field;