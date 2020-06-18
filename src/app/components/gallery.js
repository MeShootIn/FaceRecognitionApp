import React from "react";
import Content from "./content";

import face001 from "../../resourсes/face001.jpg";
import face002 from "../../resourсes/face002.jpg";
import face003 from "../../resourсes/face003.jpg";
import face004 from "../../resourсes/face004.jpg";


class Gallery extends React.Component {
    render() {
        return (
            <div className="container col-11 col-sm-8 col-md-5 py-3 my-3">
                <h2 className="text-center">{Content.gallery()}</h2>

                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={face001} className="d-block w-100 rounded" alt={Content.AlyciaDebnamCarey()} />
                            <div className="carousel-caption">
                                <h5>{Content.AlyciaDebnamCarey()}</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={face002} className="d-block w-100 rounded" alt={Content.AshleyBenson()} />
                            <div className="carousel-caption">
                                <h5>{Content.AshleyBenson()}</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={face003} className="d-block w-100 rounded" alt={Content.NinaDobrev()} />
                            <div className="carousel-caption">
                                <h5>{Content.NinaDobrev()}</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={face004} className="d-block w-100 rounded" alt={Content.KendallJenner()} />
                            <div className="carousel-caption">
                                <h5>{Content.KendallJenner()}</h5>
                            </div>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Gallery;