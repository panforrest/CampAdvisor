"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

module.exports = {
    profilesReceived: function (profiles) {
        return {
            type: constants.PROFILES_RECEIVED, //type: actions,
            profiles: profiles
        };
    },

    profileCreated: function (profile) {
        //profileCreated: (action.type) => {
        return {
            type: constants.PROFILE_CREATED,
            profile: profile
        };
    },

    currentUserReceived: function (profile) {
        return {
            type: constants.CURRENT_USER_RECEIVED,
            profile: profile
        };
    },

    reviewsReceived: function (reviews) {
        return {
            type: constants.REVIEWS_RECEIVED,
            reviews: reviews
        };
    },

    reviewCreated: function (review) {
        return {
            type: constants.REVIEW_CREATED,
            review: review
        };
    },

    campsReceived: function (camps) {
        return {
            type: constants.CAMPS_RECEIVED,
            camps: camps
        };
    },

    campCreated: function (camp) {
        return {
            type: constants.CAMP_CREATED,
            camp: camp
        };
    }

};