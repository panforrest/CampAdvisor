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
var Reviews = (function (Component) {
	function Reviews() {
		_classCallCheck(this, Reviews);

		_get(Object.getPrototypeOf(Reviews.prototype), "constructor", this).call(this);
		this.state = {
			reviews: []
		};
	}

	_inherits(Reviews, Component);

	_prototypeProperties(Reviews, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				APIManager.get("/api/review", null, function (err, response) {
					if (err) {
						var msg = err.message || err;
						alert(msg);
						return;
					}

					console.log(JSON.stringify(response.results));
					var results = response.results;
					// this.setState({
					// 	reviews: results
					// })
					_this.props.reviewsReceived(results);
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var reviews = this.props.reviews.map(function (review, i) {
					return React.createElement(
						"li",
						{ key: i },
						review.text
					);
				});

				return React.createElement(
					"div",
					null,
					"This is Reviews List:",
					reviews
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Reviews;
})(Component);

var stateToProps = function (state) {
	return {
		reviews: state.review.list
	};
};

var dispatchToProps = function (dispatch) {
	return {
		reviewsReceived: function (reviews) {
			return dispatch(actions.reviewsReceived(reviews));
		}

	};
};

module.exports = connect(stateToProps, dispatchToProps)(Reviews);