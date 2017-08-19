"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {

    currentUser: null //{}

};

module.exports = function (_x, action) {
    var state = arguments[0] === undefined ? initialState : arguments[0];
    var updatedState = Object.assign({}, state);
    switch (action.type) {
        // let updatedState = Object.assign({}, state)
        case constants.PROFILE_CREATED:
            updatedState.currentUser = action.profile;
            return updatedState;

        case constants.CURRENT_USER_RECEIVED:
            updatedState.currentUser = action.profile;
            return updatedState;

        default:
            return state;

    }
};