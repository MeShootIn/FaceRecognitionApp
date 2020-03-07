import React from "react";
import EN from "./texts";

class Description extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="w-50 text-center border rounded shadow p-3 mt-3 mb-5 bg-white rounded" style={{ fontSize: 22 }}>
                    <p>
                        {EN.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default Description;