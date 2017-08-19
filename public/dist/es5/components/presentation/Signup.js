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
var actions = _interopRequire(require("../../actions"));

var connect = require("react-redux").connect;
var Signup = (function (Component) {
    function Signup() {
        _classCallCheck(this, Signup);

        _get(Object.getPrototypeOf(Signup.prototype), "constructor", this).call(this);
        this.state = {
            visitor: {
                email: "",
                firstName: "",
                lastName: "",
                password: ""
            }
        };
    }

    _inherits(Signup, Component);

    _prototypeProperties(Signup, null, {
        update: {
            value: function update(event) {
                // console.log('updateProfile: ')
                event.preventDefault();
                // console.log(event.target.id+' == '+JSON.stringify(event.target.value))    //FORGOT target
                var updated = Object.assign({}, this.state.visitor); //var updated = Object.assign({}, this.state)//[]
                updated[event.target.id] = event.target.value;
                this.setState({
                    visitor: updated
                });
                console.log(JSON.stringify(this.state.visitor));
            },
            writable: true,
            configurable: true
        },
        login: {
            value: function login(event) {
                // event.preventDefault()
                // APIManager.post('/account/login', this.state.visitor, (err, response) => {
                //     if (err) {
                //         const msg = err.message || err
                //         // console.log(msg)
                //         alert(msg)
                //         return
                //     }

                //     console.log(JSON.stringify(response))
                //     var result = response.profile
                //     this.props.currentUserReceived(result)
                // })
                this.props.onLogin(this.state.visitor);
            },
            writable: true,
            configurable: true
        },
        register: {
            value: function register(event) {
                // event.preventDefault()
                // // console.log('register: ')
                // APIManager.post('/account/register', this.state.visitor, (err, response) => {
                //     if (err) {
                //         const msg = err.message || err
                //         alert(msg)
                //         return
                //     }

                //     console.log('register: '+JSON.stringify(response))//console.log(JSON.stringify(response.result))
                //     var result = response.profile //var result = response.result
                //     this.props.profileCreated(result)//this.state.profileCreated(result)
                // })
                this.props.onRegister(this.state.visitor);
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    this.props.currentUser != null ? React.createElement(
                        "h2",
                        null,
                        " Welcome, ",
                        this.props.currentUser.email,
                        " ",
                        this.props.currentUser.firstName,
                        " ",
                        this.props.currentUser.lastName,
                        " "
                    ) : React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "h2",
                            null,
                            "Sign up"
                        ),
                        React.createElement("input", { onChange: this.update.bind(this), type: "text", id: "email", placeholder: "Email" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.update.bind(this), type: "text", id: "firstName", placeholder: "First Name" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.update.bind(this), type: "text", id: "lastName", placeholder: "Last Name" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.update.bind(this), type: "text", id: "password", placeholder: "Password" }),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.register.bind(this) },
                            "Submit"
                        ),
                        React.createElement(
                            "h2",
                            null,
                            "Log in"
                        ),
                        React.createElement("input", { onChange: this.update.bind(this), type: "text", id: "email", placeholder: "Email" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.update.bind(this), type: "text", id: "password", placeholder: "Password" }),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.login.bind(this) },
                            "Submit"
                        )
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Signup;
})(Component);

var stateToProps = function (state) {
    return {
        profile: state.profile.user,
        currentUser: state.account.currentUser
    };
};

var dispatchToProps = function (dispatch) {
    return {
        profileCreated: function (profile) {
            return dispatch(actions.profileCreated(profile));
        },
        currentUserReceived: function (profile) {
            return dispatch(actions.currentUserReceived(profile));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Signup);