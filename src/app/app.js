import React from 'react';

import Navbar from './components/navbar';
import Description from './components/description';
import Gallery from './components/gallery';
import Upload from './components/upload';
import Input from './components/input';
import Footer from './components/footer';


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Description />
        <Gallery />
        <Upload />
        <Input />
        <Footer />
      </div>
    );
  }

}

export default App;