import React from 'react';
import './task.css';
const task = (props) =>{
    return (
        <div className="text-light bg-info border m-1 p-1 rounded text-left overflow-auto">
            <p 
                className="col-12" 
                onClick={() => props.click(props.id)} >
            {props.id+". "+props.text}</p>
        </div>
    );
};

export default task;