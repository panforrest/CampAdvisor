import constants from '../constants'

var initialState = {
	list: [] 
}

export default (state=initialState, action) => {  
	let updated = Object.assign({}, state)  
	switch(action.type){
		case constants.PROFILES_RECEIVED:
            updated['list'] = action.profiles  
            return updated

        case constants.PROFILE_CREATED:
            console.log('PROFILE_CREATED: '+JSON.stringify(action.profile))
            let updatedList = Object.assign([], updated.list)  
            updatedList.push(action.profile)
            updated['list'] = updatedList
            return updated

        default:
            return state
	} 
}