"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <h3>Hi, {this.props.currentUser.firstName} {this.props.currentUser.lastName}</h3>
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions"));

//import actions from '../../constants'
var connect = require("react-redux").connect;
var Account = (function (Component) {
  function Account(props, context) {
    _classCallCheck(this, Account);

    _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props, context);
    this.state = {
      currentUser: {}
    };
  }

  _inherits(Account, Component);

  _prototypeProperties(Account, null, {
    componentDidMount: {
      value: function componentDidMount() {
        var _this = this;
        // console.log('componentDidMount: ')
        APIManager.get("/account/currentuser", null, function (err, response) {
          if (err) {
            var msg = err.message || err;
            alert(msg);
            return;
          }
          // console.log('Admin.js: ', JSON.stringify(response.profile))
          _this.props.currentUserReceived(response.profile);
        });
      },
      writable: true,
      configurable: true
    },
    logout: {
      value: function logout(event) {
        var _this = this;
        //logout(){
        // console.log('logout: ')
        APIManager.get("/account/logout", null, function (err, response) {
          if (err) {
            var msg = err.message || err;
            alert(msg);
            return;
          }
          console.log(_this.props.currentUser.firstName);
          window.location.href = "/";
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
          "This is Account Layout.",
          React.createElement(
            "h3",
            null,
            "Hi, ",
            this.props.currentUser.firstName,
            " ",
            this.props.currentUser.lastName
          ),
          React.createElement(
            "button",
            { onClick: this.logout.bind(this) },
            "logout"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Account;
})(Component);

var stateToProps = function (state) {
  return {
    // profile: state.account.currentUser
    //currentUser: state.account.currentUser
    currentUser: state.account.currentUser
  };
};

var dispatchToProps = function (dispatch) {
  return {
    // currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
    currentUserReceived: function (profile) {
      return dispatch(actions.currentUserReceived(profile));
    }

  };
};

module.exports = connect(stateToProps, dispatchToProps)(Account);
// firstName: '',
// lastName: '',
// email: ''