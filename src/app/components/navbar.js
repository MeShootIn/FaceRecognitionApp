import React from 'react';
import Content from './content';



class Navbar extends React.Component {
    switchTo(lang) {
        const old_lang = this.props.switchLanguage(lang);

        if (old_lang !== null) {
            let btn_off = document.getElementById((old_lang === Content.Languages.EN ? 'EN' : 'RU') + '_Button');
            btn_off.className = 'btn nav-link';

            let btn_on = document.getElementById((lang === Content.Languages.EN ? 'EN' : 'RU') + '_Button');
            btn_on.className = 'btn nav-link active';
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="##" id="brand">
                        <img src="favicon.svg" width="32" height="32" focusable="false" className="d-inline-block align-top"
                            alt="Icon" />
                        {Content.AppName}
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="btn nav-link" id="RU_Button"
                                    onClick={() => this.switchTo(Content.Languages.RU)}>RU</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn nav-link active" id="EN_Button"
                                    onClick={() => this.switchTo(Content.Languages.EN)}>EN</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;