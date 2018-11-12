import React, { Component } from 'react';
import { Input, Button, Icon, Select } from 'react-magma-dom';

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

        <h1>ICONS</h1>
        <Icon id="basicInfoIcon" title="Basic Info Icon" type="info" />

        <h1>SELECTS</h1>
        <Select
          id="basicSelectId"
          name="basic"
          labelText="Basic"
          options={[
            {
              value: 'red',
              label: 'Red'
            },
            {
              value: 'blue',
              label: 'Blue'
            },
            {
              value: 'green',
              label: 'Green'
            }
          ]}
          handleOpen={() => {
            alert('opened');
          }}
          handleClose={() => {
            alert('closed');
          }}
        />
        <Select
          id="changeSelectId"
          name="change"
          labelText="Change"
          options={[
            {
              value: 'red',
              label: 'Red'
            },
            {
              value: 'blue',
              label: 'Blue'
            },
            {
              value: 'green',
              label: 'Green'
            }
          ]}
          handleChange={() => {
            alert('changed');
          }}
        />
      </div>
    );
  }
}

export default App;
