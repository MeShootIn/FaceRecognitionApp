import React from "react";
import Content from "./content";

import face001 from '../../resourсes/face001.jpg';
import face002 from '../../resourсes/face002.jpg';
import face003 from '../../resourсes/face003.jpg';
import face004 from '../../resourсes/face004.jpg';


class Upload extends React.Component {
    static fileTypes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];
    static fileTypesPrintable = ["jpeg", "jpg", "png"];

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.fileInput = React.createRef();
    }

    // [a, b]
    getRandomInt(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }

    handleChange(event) {
        event.preventDefault();

        if (this.fileInput.current.files.length !== 1) {
            return;
        }

        let file = this.fileInput.current.files[0];
        let label = document.getElementById("customLabel");

        label.innerHTML = file.name;

        if (Upload.fileTypes.includes(file.type)) {
            let input = document.getElementById("input");

            document.getElementById("card").className = "card border-success";
            document.getElementById("cardHeader").className = "card-header bg-success";
            input.src = URL.createObjectURL(file);
            input.hidden = false;
            document.getElementById("cardHeader").textContent = Content.successUpload();

            // рандом
            let match = document.getElementById("match");
            match.hidden = false;
            match.textContent = Content.match() + " " + this.getRandomInt(0, 100) + "%";
            let output = document.getElementById("output");
            let src = [face001, face002, face003, face004];

            output.src = src[this.getRandomInt(0, 3)];
            output.hidden = false;

            this.scrollToAnchor("input");
        }
        else {
            document.getElementById("card").className = "card border-danger";
            document.getElementById("cardHeader").className = "card-header bg-danger";
            document.getElementById("cardHeader").textContent = Content.wrongFileFormat() + Upload.fileTypesPrintable + ")";

            this.scrollToAnchor("card");
        }
    }

    scrollToAnchor(anchor) {
        let elem = document.getElementById(anchor);

        elem.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="container pt-3 mt-3">
                <div id="spinner" class="spinner-grow text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>

                <div className="card border-dark" id="card">
                    <div className="card-header" id="cardHeader">
                        {Content.uploadYourPicture()}
                    </div>

                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"
                                            ref={this.fileInput} onChange={this.handleChange} accept={Upload.fileTypes} />
                                        <label className="custom-file-label" for="customFile" id="customLabel" data-browse={Content.uploadButton()}>
                                            {Content.chooseFile()}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;