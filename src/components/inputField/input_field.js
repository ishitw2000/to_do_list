import React, { Component } from 'react';

class input_field extends Component{
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <input />
                    </div>
                    <div className="col-3">
                        <button>ADD</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default input_field;