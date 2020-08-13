import React from 'react';
import './header.css';

const header = (props) =>{
    return(
        <div className="jumbotron jumbotron-fluid bg-success text-light">
            <div className="container">
                <h1 className="display-5 lead">{props.title}</h1>
            </div>
        </div>
    );
}

export default header;