import React from "react";
import Content from "./content";

class Navbar extends React.Component {
    switchToRU() {
        Content.changeLanguage("RU");
    }

    switchToEN() {
        Content.changeLanguage("EN");
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <a class="navbar-brand" href="/#">
                        <img src="favicon.svg" width="32" height="32" focusable="false" class="d-inline-block align-top"
                            alt="Icon" />
                        SeriesFace
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <button className="btn nav-link" onClick={this.switchToRU}>RU</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn nav-link" onClick={this.switchToEN}>EN</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;