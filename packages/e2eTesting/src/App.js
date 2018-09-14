import React, { Component } from "react";
import { Input } from "react-magma-dom";

class App extends Component {
  render() {
    console.log(Input);
    return <Input id="id" labelText="label text" />;
  }
}

export default App;
