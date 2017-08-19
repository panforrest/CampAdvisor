"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {

	list: []

};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var updatedState = Object.assign({}, state);
	switch (action.type) {
		case constants.CAMPS_RECEIVED:
			console.log("CAMPS_RECEIVED: " + JSON.stringify(action.camps));
			updatedState.list = action.camps;
			return updatedState;

		case constants.CAMP_CREATED:
			var updatedList = Object.assign([], updatedState.list);
			updatedList.push(action.camp);
			updatedState.list = updatedList;
			return updatedState;

		default:
			return state;
	}
};