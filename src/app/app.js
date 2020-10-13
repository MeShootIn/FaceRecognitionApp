import React from 'react';

import Content from './components/content';
import Navbar from './components/navbar';
import Description from './components/description';
import Gallery from './components/gallery';
import Upload from './components/upload';
import Result from './components/result';
import Instruction from './components/instruction';
import Footer from './components/footer';


class App extends React.Component {
  static language = 0;

  constructor(props) {
    super(props);
    this.state = {
      language: Content.Languages.EN
    };
    this.set = this.switchLanguage.bind(this);
  }

  switchLanguage(lang) {
    let old_lang = null;

    if (lang !== this.state.language) {
      old_lang = this.state.language;
      App.language = lang;
      this.setState({ language: lang });
    }

    return old_lang;
  }

  static scrollToAnchor(anchor) {
    let elem = document.getElementById(anchor);
    elem.scrollIntoView({
      behavior: 'smooth'
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

  render() {
    return (
      <div>
        <Navbar switchLanguage={(lang) => this.switchLanguage(lang)} />
        <Description language={this.state.language} />
        <Gallery language={this.state.language} />
        <Upload />
        <Result />
        <Instruction language={this.state.language} />
        <Footer language={this.state.language} />
      </div>
    );
  }
}

export default App;