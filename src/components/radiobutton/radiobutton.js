import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

/*****
 * A radiobutton widget.
 *
 * == How to use a radiobutton in a component:
 *
 * In your file:
 *
 *   import radiobutton from 'carbon/lib/components/radiobutton';
 *
 * To render the radiobutton:
 *
 *  <radiobutton name='frequency' value='weekly'>Weekly</radiobutton>
 *  <radiobutton name='frequency' value='2weekly'>2 Weekly</radiobutton>
 *  <radiobutton name='frequency' value='weekly'>4 Weekly</radiobutton>
 *  <radiobutton name='frequency' value='monthly'>Monthly</radiobutton>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Radiobutton
 * @constructor
 * @decorators {Input, InputLabel, InputValidation}
 */
const Radiobutton = Input(InputLabel(InputValidation(
class Radiobutton extends React.Component {

  static propTypes = {

    /**
    * Sets the checked state of the checkbox
    *
    * @property defaultChecked
    * @type {Boolean}
    * @default false
    */
    defaultChecked: React.PropTypes.bool
  }

  static defaultProps = {
    defaultChecked: false
  }

    /**
   * Sets the value of the radiobutton [true | false]
   *
   * @method handleOnChange
   * @param {Object} ev event
   * @return {void}
   */
  handleOnChange = (ev) => {
    // we handle the change event manually here, as we pass the checked param
    // instead of value
    this._handleOnChange({ target: { value: ev.target.checked }});
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return 'ui-radiobutton';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'ui-radiobutton__input';
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * radiobutton specific props.
   *
   * @method inputProps
   * @return {Object} Props to be applied to the input
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "radio";
    // React uses checked instead of value to define the state of a radiobutton
    props.checked = this.props.checked || this.props.value;
    props.onChange = this.handleOnChange;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   * @return {Object} Props to be applied to the hidden input
   */
  get hiddenInputProps() {
    let props = {
      ref: "hidden",
      type: "hidden",
      value: "0",
      name: this.inputProps.name,
      readOnly: true
    };

    return props;
  }

  /**
   * Return the svg image for the radiobutton
   * Amended the svg contsruction to account for an issue in React
   * @return {Object} JSX svg
   */
  get radiobuttonSprite() {
    let svg = '';

    svg += '<svg width="15" height="15" viewBox="0 0 15 15">';
    svg += '  <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">';
    svg += '    <g transform="translate(-69.000000, -293.000000)">';
    svg += '      <g transform="translate(69.000000, 268.000000)">';
    svg += '        <g transform="translate(0.000000, 25.000000)">';
    svg += '          <circle class="radiobutton-fill" fill="#FFFFFF" cx="7.5" cy="7.5" r="7.5"></circle>';
    svg += '          <path class="radiobutton-outline" d="M7.5,15 C11.6421356,15 15,11.6421356 15,';
    svg += '            7.5 C15,3.35786438 11.6421356,0 7.5,0 C3.35786438,0 0,3.35786438 0,7.5 C0,';
    svg += '            11.6421356 3.35786438,15 7.5,15 Z M7.5,14 C11.0898509,14 14,11.0898509 14,';
    svg += '            7.5 C14,3.91014913 11.0898509,1 7.5,1 C3.91014913,1 1,3.91014913 1,7.5 C1,';
    svg += '            11.0898509 3.91014913,14 7.5,14 Z" fill="#AFAFAF"></path>';
    svg += '          <circle fill="#FFFFFF" cx="7.5" cy="7.5" r="3.5" class="radiobutton-check"></circle>';
    svg += '        </g>';
    svg += '      </g>';
    svg += '    </g>';
    svg += '  </g>';
    svg += '</svg>';

    return svg;
  }

  /**
   * Extends the input content to include the radiobutton sprite
   *
   * @method additionalInputContent
   * @return {Object} JSX additional content inline with input
   */
  get additionalInputContent() {
    return <div dangerouslySetInnerHTML={{ __html: this.radiobuttonSprite }}></div>;
  }

  /**
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {

    return(
      <div className={ this.mainClasses }>
        <input { ...this.hiddenInputProps } />
        { this.inputHTML }
        { this.labelHTML }
        { this.validationHTML }
      </div>
    );
  }
}
)));

export default Radiobutton;
