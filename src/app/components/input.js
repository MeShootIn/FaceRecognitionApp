import React from "react";

import face001 from '../../resourсes/face001.jpg';
import face002 from '../../resourсes/face002.jpg';

class Input extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-2"></div>

                    <div className="col-4">
                        <img className="img-thumbnail" id="input" src={face001}></img>
                    </div>

                    <div className="col-4">
                        <img className="img-thumbnail" src={face002}></img>
                    </div>

                    <div className="col-2"></div>
                </div>
            </div>
        );
    }
}

export default Input;