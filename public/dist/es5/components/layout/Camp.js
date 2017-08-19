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
            },
            review: {
                text: "" }
        };
    }

    _inherits(Camp, Component);

    _prototypeProperties(Camp, null, {
        componentDidMount: {
            value: function componentDidMount() {
                var _this2 = this;
                var _this = this;
                APIManager.get("/api/camp?slug=" + this.props.slug, null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }
                    console.log(JSON.stringify(response.results));
                    var camps = response.results;
                    _this2.props.campsReceived(camps);
                    _this.fetchPosts();
                });
            },
            writable: true,
            configurable: true
        },
        fetchPosts: {
            value: function fetchPosts() {
                var _this = this;
                console.log("fetchPosts: ");
                console.log(JSON.stringify(this.props.camp._id));
                if (this.props.camp._id == null) {
                    return;
                }

                var id = this.props.camp._id;
                APIManager.get("/api/review?camp=" + id, null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    console.log(JSON.stringify(response.results));
                    _this.props.reviewsReceived(response.results);
                });
            },
            writable: true,
            configurable: true
        },
        updateReview: {
            value: function updateReview(event) {
                event.preventDefault();
                console.log(event.target.id + " == " + event.target.value);
                var updatedReview = Object.assign({}, this.state.review);
                updatedReview[event.target.id] = event.target.value;
                var review = updatedReview;
                this.setState({
                    review: review
                });
                console.log("updatedReview: " + JSON.stringify(this.state.Review));
            },
            writable: true,
            configurable: true
        },
        submitReview: {
            value: function submitReview(event) {
                var _this = this;
                event.preventDefault();
                var text = this.state.review.text;
                if (text.length == 0) {
                    alert("Please key in your review!");
                    return;
                }
                if (this.props.currentUser == null) {
                    alert("Please log in to contribute your review");
                    return;
                }

                var review = Object.assign({}, this.state.review);
                console.log(JSON.stringify(this.props.camp._id));
                console.log(JSON.stringify(this.props.currentUser._id));
                review.camp = this.props.camp._id;
                review.profile = this.props.currentUser.id; //WHY NOT _id?

                APIManager.post("/api/review", review, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }
                    _this.props.reviewCreated(response.result);
                    console.log("submitReview: " + JSON.stringify(response.result));
                });

            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var reviewList = this.props.reviews.map(function (review, i) {
                    return React.createElement(
                        "a",
                        { key: i, href: "#", className: "list-group-item" },
                        React.createElement(
                            "h4",
                            { className: "list-group-item-heading" },
                            review.profile,
                            ", ",
                            review.timestamp
                        ),
                        React.createElement(
                            "p",
                            { className: "list-group-item-text" },
                            review.text
                        )
                    );
                });

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
                                    React.createElement(
                                        "p",
                                        null,
                                        "Country: ",
                                        this.props.camp.country
                                    ),
                                    React.createElement(
                                        "p",
                                        null,
                                        "Description: ",
                                        this.props.camp.description
                                    ),
                                    React.createElement("textarea", { onChange: this.updateReview.bind(this), placeholder: "Add your review here", id: "text", className: "form-control" }),
                                    React.createElement("br", null),
                                    React.createElement(
                                        "button",
                                        { onClick: this.submitReview.bind(this), className: "btn btn-success" },
                                        "Submit Review"
                                    ),
                                    React.createElement("br", null),
                                    React.createElement("hr", { style: { borderTop: "1px solid red #444" } }),
                                    React.createElement(
                                        "ol",
                                        null,
                                        reviewList
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
        camp: campsArray.length == 0 ? { name: "" } : campsArray[0],
        reviews: state.review.list,
        currentUser: state.account.currentUser
    };
};

var dispatchToProps = function (dispatch) {
    return {
        campsReceived: function (camps) {
            return dispatch(actions.campsReceived(camps));
        },
        reviewCreated: function (review) {
            return dispatch(actions.reviewCreated(review));
        },
        reviewsReceived: function (reviews) {
            return dispatch(actions.reviewsReceived(reviews));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Camp);
// profile:''