"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var combineReducers = _redux.combineReducers;
var applyMiddleware = _redux.applyMiddleware;
var thunk = _interopRequire(require("redux-thunk"));

var _reducers = require("../reducers");

var profileReducer = _reducers.profileReducer;
var accountReducer = _reducers.accountReducer;
var reviewReducer = _reducers.reviewReducer;
var campReducer = _reducers.campReducer;


var store;

// export default {

//     configureStore: () => {

//     	const reducers = combineReducers({
//     		profile: profileReducer,
//     	    account: accountReducer,
//             review: reviewReducer,
//             camp: campReducer
//         }),

//     	store = createStore(
//     		reducers,
//     		applyMiddleware()
//     	)


//     	return store
//     },

//     currentStore: () => {
//     	return store
//     }

// }

var reducers = combineReducers({
    profile: profileReducer,
    account: accountReducer,
    review: reviewReducer,
    camp: campReducer
});

var store = createStore(reducers, applyMiddleware(thunk));

module.exports = store;