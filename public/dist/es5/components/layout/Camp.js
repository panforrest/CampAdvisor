"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var Nav = require("../containers").Nav;
var Camp = (function (Component) {
  function Camp() {
    _classCallCheck(this, Camp);

    _get(Object.getPrototypeOf(Camp.prototype), "constructor", this).call(this);
    this.state = {
      camp: {
        title: ""
      }
    };
  }

  _inherits(Camp, Component);

  _prototypeProperties(Camp, null, {
    componentDidMount: {
      value: function componentDidMount() {
        var _this = this;
        APIManager.get("/api/camp?slug=" + this.props.slug, null, function (err, response) {
          if (err) {
            var msg = err.message || err;
            alert(msg);
            return;
          }
          console.log(JSON.stringify(response.results)); //(response.result))
          var camp = response.results[0];
          _this.setState({
            camp: camp
          });
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          "This is Camp component.",
          React.createElement(
            "h2",
            null,
            this.state.camp.title
          ),
          React.createElement(
            "ol",
            null,
            React.createElement(
              "li",
              null,
              "Review1"
            ),
            React.createElement(
              "li",
              null,
              "Review2"
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Camp;
})(Component);

module.exports = Camp;