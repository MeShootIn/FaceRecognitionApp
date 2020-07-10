import React from "react";
import Content from "./content";


class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataset: []
        };
        this.loadCelebrities = this.loadCelebrities.bind(this);
    }

    componentDidMount() {
        this.loadCelebrities();
    }

    async loadCelebrities() {
        this.setState({
            dataset: Object.keys(Content.Celebrities).map(originalName => {
                return {
                    src: require(`../../resourсes/labeled_images/${originalName} 1.jpg`),
                    celebrityName: originalName
                };
            })
        });
    }

    render() {
        return (
            <div className="container col-11 col-sm-8 col-md-5 py-3 my-3">
                <h2 className="text-center">{Content.gallery()}</h2>

                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {
                            this.state.dataset.map((elem, i) =>
                                <CarouselItem key={i} src={elem.src} celebrityName={elem.celebrityName}
                                    active={(i === 0) ? "true" : "false"} />
                            )
                        }
                    </div>

                    <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">{Content.previous()}</span>
                    </a>

                    <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">{Content.next()}</span>
                    </a>
                </div>
            </div>
        );
    }
}

class CarouselItem extends React.Component {
    render() {
        return (
            <div className={"carousel-item" + ((this.props.active === "true") ? " active" : "")}>
                <img src={this.props.src} className="d-block w-100 rounded" alt={Content.celebrityName(this.props.celebrityName)} />

                <div className="carousel-caption">
                    <h5>{Content.celebrityName(this.props.celebrityName)}</h5>
                </div>
            </div>
        );
    }
}

export default Gallery;