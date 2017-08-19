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
        case constants.REVIEWS_RECEIVED:
            console.log("REVIEWS_RECEIVED: " + JSON.stringify(action.reviews));
            updated.list = action.reviews;
            return updated;

        case constants.REVIEW_CREATED:
            var updatedList = Object.assign([], updated.list);
            updatedList.push(action.review);
            updated.list = updatedList;
            return updated;

        default:
            return state;
    }
};