import React from "react";

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-info">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a class="navbar-brand" href="#">
                            <img src="favicon.svg" width="32" height="32" focusable="false" class="d-inline-block align-top" />
                            SeriesFace
                        </a>
                    </div>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="nav-link">
                                    Language:
                                </span>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">RU</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="index.html">EN</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;