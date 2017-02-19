import React, {Component} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class TypePicker extends Component {

  render() {
    return (
      <RadioButtonGroup name="cbType" valueSelected={this.props.cbType} onChange={this.props.changeCbType}>
        <RadioButton
          value="Protanope"
          label="Protanope"
          style={styles.radioButton}
        />
        <RadioButton
          value="Deuteranope"
          label="Deuteranope"
          style={styles.radioButton}
        />
        <RadioButton
          value="Tritanope"
          label="Tritanope"
          style={styles.radioButton}
        />
      </RadioButtonGroup>
    );
  }

}

export default TypePicker;