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

    this.state = { language: App.language };
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(lang) {
    if (lang !== App.language) {
      App.language = lang;
      this.setState({ language: App.language });
    }
  }

  render() {
    return (
      <div>
        <button id="ruButtonHidden" onClick={() => { this.changeLanguage(App.Languages.RU) }} hidden></button>
        <button id="enButtonHidden" onClick={() => { this.changeLanguage(App.Languages.EN) }} hidden></button>

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