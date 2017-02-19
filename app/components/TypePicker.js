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
      <div>
        <h3>Colorblind Type</h3>
        <RadioButtonGroup name="cbType" valueSelected={this.props.cbType} onChange={this.props.changeCbType}>
          <RadioButton
            value="Protanope"
            label="Protanope"
            disabled={this.props.disabled}
            style={styles.radioButton}
          />
          <RadioButton
            value="Deuteranope"
            label="Deuteranope"
            disabled={this.props.disabled}
            style={styles.radioButton}
          />
          <RadioButton
            value="Tritanope"
            label="Tritanope"
            disabled={this.props.disabled}
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  }

}

export default TypePicker;