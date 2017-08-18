import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { profileReducer, accountReducer, reviewReducer } from '../reducers'

var store;

export default {

    configureStore: () => {
    	
    	const reducers = combineReducers({
    		profile: profileReducer, 
    	    account: accountReducer,
            review: reviewReducer
        }),

    	store = createStore(
    		reducers,
    		applyMiddleware()
    	)


    	return store
    },

    currentStore: () => {
    	return store
    }

}