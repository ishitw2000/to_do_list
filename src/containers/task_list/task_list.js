import React from 'react';
import Task from '../../components/task/task';

const task_list = (props) =>{
    let list = null;
    if(props.tasks){
        list = Object.keys(props.tasks).map((p) =>{
            let task = props.tasks[p];
            return (
            <Task 
                key={p} 
                text={task.text} 
                id={parseInt(p)+1} 
                click={props.delete}>
            </Task>
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