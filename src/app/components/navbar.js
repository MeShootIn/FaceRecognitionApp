import React from "react";
import Content from "./content";

class Navbar extends React.Component {
    kek() {

    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="favicon.svg" width="32" height="32" focusable="false" class="d-inline-block align-top" />
                        SeriesFace
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="nav-link">
                                    {Content.language}
                                </span>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" href="#">RU</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">EN</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;