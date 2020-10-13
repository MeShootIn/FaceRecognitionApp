import React from 'react';
import Content from './content';



class Description extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="col-10 col-sm-8 text-center border rounded shadow pt-3 mt-3 bg-white" style={{ fontSize: 22 }}>
                    <p>
                        {Content.description[this.props.language]}
                    </p>
                </div>
            </div>
        );
    }
}

export default Description;