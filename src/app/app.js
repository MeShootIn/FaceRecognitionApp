import React from 'react';

import Navbar from './components/navbar';
import Description from './components/description';
import Gallery from './components/gallery';
import Upload from './components/upload';
import Result from './components/result';
import Footer from './components/footer';
import Instruction from './components/instruction';


class App extends React.Component {
  static language = "EN";

  constructor(props) {
    super(props);

    this.state = {language : App.language};

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(lang) {
    App.language = lang;
    this.setState({language : App.language});
  }

  render() {
    return (
      <div>
        <button id="ruButtonHidden" onClick={() => {this.changeLanguage("RU")}} hidden></button>
        <button id="enButtonHidden" onClick={() => {this.changeLanguage("EN")}} hidden></button>

        <Navbar />
        <Description />
        <Gallery />
        <Upload />
        <Result />
        <Instruction />
        <Footer />
      </div>
    );
  }

}

export default App;