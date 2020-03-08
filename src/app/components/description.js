import React from "react";
import Content from "./content";

class Description extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="w-50 text-center border rounded shadow p-3 mt-3 bg-white rounded" style={{ fontSize: 22 }}>
                    <p>
                        {Content.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default Description;