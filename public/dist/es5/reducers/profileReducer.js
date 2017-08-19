"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  list: []
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updated = Object.assign({}, state);
  switch (action.type) {
    case constants.PROFILES_RECEIVED:
      updated.list = action.profiles;
      return updated;

    case constants.PROFILE_CREATED:
      console.log("PROFILE_CREATED: " + JSON.stringify(action.profile));
      var updatedList = Object.assign([], updated.list);
      updatedList.push(action.profile);
      updated.list = updatedList;
      return updated;

    default:
      return state;
  }
};