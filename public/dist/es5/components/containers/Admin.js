"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var actions = _interopRequire(require("../../actions"));

var connect = require("react-redux").connect;
var Signup = require("../presentation").Signup;
var APIManager = require("../../utils").APIManager;
var Admin = (function (Component) {
    function Admin() {
        _classCallCheck(this, Admin);

        _get(Object.getPrototypeOf(Admin.prototype), "constructor", this).call(this);
        this.state = {
            review: {
                profile: "",
                camp: "",
                text: ""
            },
            camp: {
                title: "",
                slug: ""
                // description: '',
                // country: '',
                // url: ''
            }
        };
    }

    _inherits(Admin, Component);

    _prototypeProperties(Admin, null, {
        componentDidMount: {
            value: function componentDidMount() {
                var _this = this;
                APIManager.get("/account/currentuser", null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }
                    console.log("Admin.js: " + JSON.stringify(response.profile));
                    _this.props.currentUserReceived(response.profile);
                });

            },
            writable: true,
            configurable: true
        },
        register: {
            value: function register(visitor) {
                var _this = this;
                APIManager.post("/account/register", visitor, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    console.log("register: " + JSON.stringify(response));
                    _this.props.profileCreated(response.profile);
                });
            },
            writable: true,
            configurable: true
        },
        login: {
            value: function login(credentials) {
                var _this = this;
                APIManager.post("/account/login", credentials, function (err, response) {
                    if (err) {
                        var msg = err.message || err;

                        alert(msg);
                        return;
                    }

                    console.log(JSON.stringify(response));
                    _this.props.currentUserReceived(response.profile);
                });
            },
            writable: true,
            configurable: true
        },
        updateCamp: {

            // updateReview(event){
            //     event.preventDefault()
            //     let updatedReview = Object.assign({}, this.state.review)
            //     updatedReview[event.target.id] = event.target.value 
            //     this.setState({
            //         review: updatedReview
            //     })
            //     console.log('updatedReview: '+JSON.stringify(this.state.review))
            // }

            // submitReview(event){
            //     event.preventDefault()
            //     var review = this.state.review
            //     review['profile'] = this.props.currentUser.id

            //     APIManager.post('/api/review', review, (err, response) => {
            //         if (err){
            //             const msg = err.message || err
            //             alert(JSON.stringify(msg))
            //             return
            //         }
            //         console.log('submit: '+JSON.stringify(response.result))
            //         var result = response.result
            //         this.props.reviewCreated(review)
            //     })
            // }

            value: function updateCamp(event) {
                event.preventDefault();
                console.log("updateCamp: " + event.target.id + " == " + event.target.value);
                var updatedCamp = Object.assign({}, this.state.camp);
                updatedCamp[event.target.id] = event.target.value;
                this.setState({
                    camp: updatedCamp
                });
            },
            writable: true,
            configurable: true
        },
        submitCamp: {
            value: function submitCamp(event) {
                var _this = this;
                event.preventDefault();
                console.log("to submitCamp: " + JSON.stringify(this.state.camp));
                var camp = this.state.camp;
                var title = camp.title;
                var parts = title.split(" ");

                var slug = "";
                for (var i = 0; i < parts.length; i++) {
                    var word = parts[i];
                    slug += word;
                    if (i != parts.length - 1) slug += "-";
                }

                // slug = slug.repalce('?', '-')
                slug = slug.replace("?", "-");
                camp.slug = slug;
                console.log(JSON.stringify(camp));

                APIManager.post("/api/camp", camp, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(JSON.stringify(msg));
                        return;
                    }

                    console.log("camp submitted: " + JSON.stringify(response.result));
                    _this.props.campCreated(response.result);
                    window.location.href = "/camp/" + camp.slug;
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
                    this.props.currentUser == null ? React.createElement(Signup, { onRegister: this.register.bind(this), onLogin: this.login.bind(this) }) : React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "h2",
                            null,
                            "Welcome! ",
                            this.props.currentUser.firstName,
                            " ",
                            this.props.currentUser.lastName
                        ),
                        React.createElement(
                            "h3",
                            null,
                            "Create Camp"
                        ),
                        React.createElement("input", { onChange: this.updateCamp.bind(this), type: "text", id: "title", placeholder: "Camp Title" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.updateCamp.bind(this), type: "text", id: "description", placeholder: "Camp Description" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.updateCamp.bind(this), type: "text", id: "country", placeholder: "Camp Country" }),
                        React.createElement("br", null),
                        React.createElement("input", { onChange: this.updateCamp.bind(this), type: "text", id: "url", placeholder: "Camp Url" }),
                        React.createElement("br", null),
                        React.createElement("input", { onClick: this.submitCamp.bind(this), type: "submit", value: "Submit" })
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Admin;
})(Component);

var stateToProps = function (state) {
    return {
        profiles: state.profile.list,
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
        },
        reviewCreated: function (review) {
            return dispatch(actions.reviewCreated(review));
        },
        campCreated: function (camp) {
            return dispatch(actions.campCreated(camp));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Admin);