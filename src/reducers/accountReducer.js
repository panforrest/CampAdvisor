import constants from '../constants'

var initialState = {

    currentUser: null //{}

}

export default (state=initialState, action) => {
    let updatedState = Object.assign({}, state)
    switch(action.type) {
    	// let updatedState = Object.assign({}, state)
    	case constants.PROFILE_CREATED:
            updatedState['currentUser'] = action.profile
    	    return updatedState

    	case constants.CURRENT_USER_RECEIVED:
            updatedState['currentUser'] = action.profile
    	    return updatedState

    	default:
    	    return state

    }
}