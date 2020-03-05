import React from "react";

class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileInput = React.createRef();
    }

    handleChange(event) {
        event.preventDefault();

        let label = document.getElementById("customLabel");
        label.innerHTML = this.fileInput.current.files[0].name;
    }

    handleSubmit(event) {
        event.preventDefault();

        document.getElementById("card").className = "card border-success";
        document.getElementById("cardHeader").className = "card-header bg-success";
    }

    render() {
        return (
            <div className="card border-warning" id="card">
                <div className="card-header bg-warning" id="cardHeader">
                    Upload your picture
                </div>

                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-7 ml-auto">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"
                                        ref={this.fileInput} onChange={this.handleChange} />
                                        <label className="custom-file-label" for="customFile" id="customLabel">Choose file</label>
                                    </div>
                                </div>

                                <div className="col-1 mr-auto">
                                    <button className="btn btn-info" type="submit" onClick={this.handleClick}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Upload;