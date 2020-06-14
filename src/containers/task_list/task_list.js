import React from 'react';
import Task from '../../components/task/task';
import './task_list.css';

const task_list = (props) =>{
    let list = null;
    if(props.tasks !== null){
        list = Object.keys(props.tasks).map((p) =>{
            let task = props.tasks[p];
            return (
                // <div className="row">
                //     <div className="col-12">
                //         <Task key={p.id} text={task.text}/>
                //     </div>
                // </div>
                <Task key={p} text={task.text}/>
            );
        });
    }
    return (
        <div className="container">
            {list}
        </div>
    );
}

export default task_list;