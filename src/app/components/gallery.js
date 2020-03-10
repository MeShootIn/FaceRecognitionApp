import React from "react";

import face001 from '../../resourсes/face001.jpg';
import face002 from '../../resourсes/face002.jpg';
import face003 from '../../resourсes/face003.jpg';
import face004 from '../../resourсes/face004.jpg';

class Gallery extends React.Component {
    render() {
        return (
            <div className="container col-11 col-sm-8 col-md-5 py-3 my-3">
                <h2 className="text-center">Celebrity gallery</h2>

                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carousel" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel" data-slide-to="1"></li>
                        <li data-target="#carousel" data-slide-to="2"></li>
                        <li data-target="#carousel" data-slide-to="3"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={face001} className="d-block w-100 rounded" alt="Alycia Debnam-Carey" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Alycia Debnam-Carey</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={face002} className="d-block w-100 rounded" alt="Ashley Benson" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Ashley Benson</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={face003} className="d-block w-100 rounded" alt="Nina Dobrev" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Nina Dobrev</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={face004} className="d-block w-100 rounded" alt="Kendall Jenner" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Kendall Jenner</h5>
                            </div>
                        </div>
                    </div>

                    <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>

                    <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Gallery;
