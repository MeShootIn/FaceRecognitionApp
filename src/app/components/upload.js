import React from "react";
import Content from "./content";

class Upload extends React.Component {
    static fileTypes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];
    static fileTypesPrintable = ["jpeg", "jpg", "png"];

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileInput = React.createRef();
    }

    handleChange(event) {
        event.preventDefault();

        if (this.fileInput.current.files.length !== 0) {
            let file = this.fileInput.current.files[0];
            let label = document.getElementById("customLabel");

            label.innerHTML = file.name;
        }

        let submitButton = document.getElementById("submitButton");
        submitButton.disabled = false;
    }

    handleSubmit(event) {
        event.preventDefault();

        let file = this.fileInput.current.files[0];

        if (Upload.fileTypes.includes(file.type)) {
            let submitButton = document.getElementById("submitButton");
            submitButton.disabled = true;

            document.getElementById("card").className = "card border-success";
            document.getElementById("cardHeader").className = "card-header bg-success";

            this.scrollToAnchor("input");

            let input = document.getElementById("input");
            input.src = URL.createObjectURL(file);
        }
        else {
            document.getElementById("card").className = "card border-danger";

            document.getElementById("cardHeader").className = "card-header bg-danger";
            document.getElementById("cardHeader").textContent = "Wrong file format (ONLY " + Upload.fileTypesPrintable + ")";

            this.scrollToAnchor("card");
        }
    }

    scrollToAnchor(anchor) {
        let elem = document.getElementById(anchor);

        elem.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="card border-dark" id="card">
                    <div className="card-header" id="cardHeader">
                        {Content.upload}
                    </div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-7 ml-auto">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="customFile"
                                                ref={this.fileInput} onChange={this.handleChange} accept={Upload.fileTypes} />
                                            <label className="custom-file-label" for="customFile" id="customLabel">
                                                Choose file
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-1 mr-auto">
                                        <button className="btn btn-primary" type="submit" id="submitButton" disabled>Submit</button>
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