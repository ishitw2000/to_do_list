import React from 'react';
import './header.css';

const header = (props) =>{
    return(
        // <div className="text-light bg-success jumbotron">
        //     <div className="container" style={{"height":"20px","alignItems":"middle"}}>
        //         <h3 class="head-title">
        //             <u><b>{props.title}</b></u>
        //         </h3>
        //     </div>
        // </div>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-5 lead">{props.title}</h1>
            </div>
        </div>
    );
}

export default header;