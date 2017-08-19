import constants from '../constants'

var initialState = {

	list: []

}

export default (state=initialState, action) => {
	let updatedState = Object.assign({}, state)
	switch(action.type){
		case constants.CAMPS_RECEIVED:
		    console.log('CAMPS_RECEIVED: '+JSON.stringify(action.camps))
		    updatedState['list'] = action.camps
		    return updatedState
        
        case constants.CAMP_CREATED:
            // const updatedList = Object.assign([], updatedState.list)
            updatedList.push(action.camp)
            updatedState['list'] = updatedList
            return updatedState

		default:
		    return state
	}
}