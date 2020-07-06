import React from "react";
import App from "../app";


class Navbar extends React.Component {
    switchToRU() {
        App.setLanguage(App.Languages.RU);

        let ruButton = document.getElementById("ruButton");
        ruButton.className = "btn nav-link active";
        let enButton = document.getElementById("enButton");
        enButton.className = "btn nav-link";
    }

    switchToEN() {
        App.setLanguage(App.Languages.EN);

        let ruButton = document.getElementById("ruButton");
        ruButton.className = "btn nav-link";
        let enButton = document.getElementById("enButton");
        enButton.className = "btn nav-link active";
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/#">
                        <img src="favicon.svg" width="32" height="32" focusable="false" className="d-inline-block align-top"
                            alt="Icon" />
                        SeriesFace
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="btn nav-link" id="ruButton" onClick={this.switchToRU}>RU</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn nav-link active" id="enButton" onClick={this.switchToEN}>EN</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;