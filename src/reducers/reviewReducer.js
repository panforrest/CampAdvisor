import constants from '../constants'

var initialState = {

	list: []

}

export default (state=initialState, action) => {
    var updated = Object.assign({}, state)
    switch(action.type){
    	case constants.REVIEWS_RECEIVED:
    	    console.log('REVIEWS_RECEIVED: '+JSON.stringify(action.reviews))
            updated['list'] = action.reviews
            return updated

        case constants.REVIEW_CREATED:
            var updatedList = Object.assign([], updated.list) 
            updatedList.push(action.review)   
            updated['list'] = updatedList
            console.log('REVIEW_CREATED: '+JSON.stringify(updated['list']))

            // var updatedList = (updated.list) ? Object.assign([], updated.list) : []
            // updatedList.push(action.review)   
            // updated['list'] = updatedList
            // console.log('REVIEW_CREATED: '+JSON.stringify(updated['list']))


            return updated

    	default:
    	    return state
    }

}