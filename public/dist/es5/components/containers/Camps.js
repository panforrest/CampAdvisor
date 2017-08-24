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
var CampPreview = _interopRequire(require("./CampPreview"));

var Admin = _interopRequire(require("./Admin"));

var Camps = (function (Component) {
	function Camps(context, props) {
		_classCallCheck(this, Camps);

		_get(Object.getPrototypeOf(Camps.prototype), "constructor", this).call(this, context, props);
		this.state = {
			camps: []
		};
	}

	_inherits(Camps, Component);

	_prototypeProperties(Camps, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				APIManager.get("/api/camp", null, function (err, response) {
					if (err) {
						var msg = err.message || err;
						alert(msg);
						return;
					}

					// console.log(JSON.stringify(response.results))
					var results = response.results;
					_this.props.campsReceived(results);
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var campList = this.props.camps.map(function (camp, i) {
					return React.createElement(CampPreview, { key: camp._id, camp: camp });
				});

				return React.createElement(
					"div",
					{ className: "container clearifx" },
					React.createElement(
						"div",
						{ className: "col_three_fifth bothsidebar nobottommargin" },
						React.createElement(
							"div",
							{ className: "fancy-title title-border" },
							React.createElement(
								"h3",
								null,
								"CampAdvisor's Camping Review"
							)
						),
						React.createElement(
							"div",
							{ id: "posts", className: "events small-thumbs" },
							campList
						)
					),
					React.createElement(
						"div",
						{ className: "col_one_fifth bothsidebar nobottommargin" },
						React.createElement(Admin, null)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Camps;
})(Component);

var stateToProps = function (state) {
	return {
		camps: state.camp.list
	};
};

var dispatchToProps = function (dispatch) {
	return {
		campsReceived: function (camps) {
			return dispatch(actions.campsReceived(camps));
		}

	};
};

module.exports = connect(stateToProps, dispatchToProps)(Camps);