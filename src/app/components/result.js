import React from "react";
import Content from "./content";


class Result extends React.Component {
    // canvas() {
    //     let canvas = document.getElementById("canvas");
    //     let ctx = canvas.getContext("2d");

    //     let image = new Image();
    //     image.src = "../logo192.png";

    //     ctx.drawImage(image, 0, 0);

    //     ctx.moveTo(0, 0);
    //     ctx.lineTo(50, 80);
    //     ctx.stroke();
    // }
    // handleOnLoadInput() {
    //     let inputImage = new Image();

    //     inputImage.className = "img-thumbnail";
    //     inputImage.id = "input";
    //     inputImage.alt = Content.yourFace();
    //     inputImage.src = "";

    //     let ctx = document.getElementById("canvas").getContext("2d");
    //     inputImage.onload = () => {
    //         ctx.drawImage(inputImage, 50, 80, 300, 150);
    //     }
    // }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        {/* <canvas id="canvas" onLoad={this.handleOnLoadInput}></canvas> */}
                        <img className="img-thumbnail" id="input" alt={Content.yourFace()} hidden></img>
                    </div>

                    <div className="col-md-6">
                        <img className="img-thumbnail" id="output" alt={Content.celebrityFace()} hidden></img>
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col">
                        <h2 id="match" hidden>{Content.match()}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;