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
var actions = _interopRequire(require("../../actions"));

var connect = require("react-redux").connect;
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
                    console.log(JSON.stringify(response.results));
                    var camps = response.results;
                    _this.props.campsReceived(camps);
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
                    React.createElement(
                        "section",
                        { id: "content" },
                        React.createElement(
                            "div",
                            { className: "content-wrap" },
                            React.createElement(
                                "div",
                                { className: "container clearfix" },
                                React.createElement(
                                    "div",
                                    { className: "postcontent nobottommargin clearfix" },
                                    React.createElement(
                                        "h4",
                                        null,
                                        this.props.camp.title
                                    ),
                                    React.createElement("textarea", { placeholder: "Add your review here", className: "form-control" }),
                                    React.createElement("br", null),
                                    React.createElement(
                                        "button",
                                        { className: "btn btn-success" },
                                        "Add Review"
                                    ),
                                    React.createElement("br", null),
                                    React.createElement("hr", { style: { borderTop: "1px solid red #444" } }),
                                    React.createElement(
                                        "div",
                                        { className: "list-group" },
                                        React.createElement(
                                            "a",
                                            { href: "#", className: "list-group-item" },
                                            React.createElement(
                                                "h4",
                                                { className: "list-group-item-heading" },
                                                "List group item heading"
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "list-group-item-text" },
                                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio."
                                            )
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "#", className: "list-group-item" },
                                            React.createElement(
                                                "h4",
                                                { className: "list-group-item-heading" },
                                                "List group item heading"
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "list-group-item-text" },
                                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio."
                                            )
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "#", className: "list-group-item" },
                                            React.createElement(
                                                "h4",
                                                { className: "list-group-item-heading" },
                                                "List group item heading"
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "list-group-item-text" },
                                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio."
                                            )
                                        )
                                    )
                                )
                            )
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

var stateToProps = function (state) {
    // var campsArray = state.camps.list
    var campsArray = state.camp.list;

    return {
        camp: campsArray.length == 0 ? { name: "" } : campsArray[0]
    };
};

var dispatchToProps = function (dispatch) {
    return {
        campsReceived: function (camps) {
            return dispatch(actions.campsReceived(camps));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Camp);