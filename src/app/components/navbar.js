import React from "react";


class Navbar extends React.Component {
    switchToRU() {
        let ruButtonHidden = document.getElementById("ruButtonHidden");
        ruButtonHidden.click();

        let ruButton = document.getElementById("ruButton");
        ruButton.className = "btn nav-link active";
        let enButton = document.getElementById("enButton");
        enButton.className = "btn nav-link";
    }

    switchToEN() {
        let enButtonHidden = document.getElementById("enButtonHidden");
        enButtonHidden.click();

        let ruButton = document.getElementById("ruButton");
        ruButton.className = "btn nav-link";
        let enButton = document.getElementById("enButton");
        enButton.className = "btn nav-link active";
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