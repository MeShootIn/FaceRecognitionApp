import React from "react";

const fileTypes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];

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
        // обработать случай, когда .name == undefined
        //alert(this.fileInput.current.files[0].name === undefined);
        label.innerHTML = this.fileInput.current.files[0].name;

        let submitButton = document.getElementById("submitButton");
        submitButton.disabled = false;
    }

    handleSubmit(event) {
        event.preventDefault();

        let file = this.fileInput.current.files[0];

        if (fileTypes.includes(file.type)) {
            let submitButton = document.getElementById("submitButton");
            submitButton.disabled = true;

            document.getElementById("card").className = "card border-success";
            document.getElementById("cardHeader").className = "card-header bg-success";
            
            this.scrollToAnchor("output");
        }
        else{
            document.getElementById("card").className = "card border-danger";

            document.getElementById("cardHeader").className = "card-header bg-danger";
            document.getElementById("cardHeader").textContent = "Wrong file format";

            this.scrollToAnchor("card");
        }
    }

    scrollToAnchor(anchor) {
        let output = document.getElementById(anchor);

        output.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="container">
                <div className="card border-info" id="card">
                    <div className="card-header bg-info" id="cardHeader">
                        Upload your picture
                    </div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-7 ml-auto">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="customFile"
                                                ref={this.fileInput} onChange={this.handleChange} accept={fileTypes} />
                                            <label className="custom-file-label" for="customFile" id="customLabel">
                                                Choose file
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-1 mr-auto">
                                        <button className="btn btn-info" type="submit" id="submitButton" disabled>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;