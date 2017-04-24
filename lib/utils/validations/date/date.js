'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validations = require('./../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

var _date = require('./../../helpers/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Validates a date
 *
 * @constructor DateValidator
 */
var DateValidator =

/**
 * @method constructor
 * @param {Object} params
 */
function DateValidator() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, DateValidator);

  this.validate = function (value) {
    return !value || _date2.default.isValidDate(value);
  };

  this.message = function () {
    return _validations2.default.validationMessage(_this.customMessage, 'errors.messages.wrong_format');
  };

  this.customMessage = params.customMessage;
}

/**
 * This will validate the given value, and return a valid status.
 *
 * @method validate
 * @param {Object} value to check
 * @return {Boolean} true if value is valid
 */


/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */
;

exports.default = DateValidator;