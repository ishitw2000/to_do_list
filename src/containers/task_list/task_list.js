import React from 'react';
import Task from '../../components/task/task';
import './task_list.css';

const task_list = (props) =>{
    const list = Object.keys(props.tasks).map(p =>{
        let task = props.tasks[p];
        return (
            <div className="row">
                <div className="col-12">
                    <Task text={task.text}/>
                </div>
            </div>
        );
    });
    return (
        <div className="container">
            {list}
        </div>
    );
}

export default task_list;