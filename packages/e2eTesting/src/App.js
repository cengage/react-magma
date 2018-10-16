import React, { Component } from 'react';
import { Input, Button, Header, Icon } from 'react-magma-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>INPUTS</h1>
        <Input id="labeledInput" labelText="Label" />
        <Input id="focusedInput" autoFocus={true} />
        <Input id="defaultInput" />
        <Input id="numberInput" type="number" />
        <Input id="passwordInput" type="password" />
        <Input id="requiredInput" required={true} />
        <Input id="disabledInput" disabled={true} />

        <h1>BUTTONS</h1>
        <Button
          id="defaultButton"
          text="Default Button"
          handleClick={() => {
            alert('clicked');
          }}
        />
        <Button id="disabledButton" text="Disabled Button" disabled />

        <h1>HEADERS</h1>
        <Header id="header1" size={1}>
          Header 1
        </Header>
        <Header id="header2" size={2}>
          Header 2
        </Header>
        <Header id="header3" size={3}>
          Header 3
        </Header>
        <Header id="header4" size={4}>
          Header 4
        </Header>
        <Header id="header5" size={5}>
          Header 5
        </Header>
        <Header id="header6" size={6}>
          Header 6
        </Header>
        <h1>ICONS</h1>
        <Icon id="basicInfoIcon" title="Basic Info Icon" type="info" />
      </div>
    );
  }
}

export default App;
