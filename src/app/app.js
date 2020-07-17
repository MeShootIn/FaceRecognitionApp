import React from 'react';

import Navbar from './components/navbar';
import Description from './components/description';
import Gallery from './components/gallery';
import Upload from './components/upload';
import Result from './components/result';
import Footer from './components/footer';
import Instruction from './components/instruction';


class App extends React.Component {
  static Languages = {
    EN: 0,
    RU: 1
  };

  static language = App.Languages.EN;

  constructor(props) {
    super(props);

    this.state = {
      language: App.language
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static setLanguage(lang) {
    let buttons = document.getElementsByClassName("langButtonHidden");
    buttons[lang].click();
  }

  handleClick(lang) {
    if (lang !== App.language) {
      App.language = lang;
      this.setState({
        language: App.language
      });
    }
  }

  static scrollToAnchor(anchor) {
    let elem = document.getElementById(anchor);
    elem.scrollIntoView({
      behavior: "smooth"
    });
  }

  static showById(id) {
    let elem = document.getElementById(id);
    elem.hidden = false;
  }

  static hideById(id) {
    let elem = document.getElementById(id);
    elem.hidden = true;
  }

  // what is the hidden button?
  render() {
    return (
      <div>
        <button className="langButtonHidden" onClick={() => this.handleClick(App.Languages.EN)} hidden></button>
        <button className="langButtonHidden" onClick={() => this.handleClick(App.Languages.RU)} hidden></button>

        <Navbar />
        <Description language={App.language}/>
        <Gallery />
        <Upload />
        <Result />
        <Instruction language={App.language}/>
        <Footer />
      </div>
    );
  }

}

export default App;