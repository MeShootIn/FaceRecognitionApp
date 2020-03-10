import React from 'react';

import Navbar from './components/navbar';
import Description from './components/description';
import Gallery from './components/gallery';
import Upload from './components/upload';
import Result from './components/result';
import Footer from './components/footer';
import Instruction from './components/instruction';


class App extends React.Component {
  render() {
    return (
      <div>
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