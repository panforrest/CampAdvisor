import constants from '../constants'

export default {
    profilesReceived: (profiles) => {
    	return {
    		type: constants.PROFILES_RECEIVED,   //type: actions,
    		profiles: profiles
    	}
    },

    profileCreated: (profile) => {   //profileCreated: (action.type) => {
    	return {
    		type: constants.PROFILE_CREATED,
    		profile: profile
    	}
    },

    currentUserReceived: (profile) => {
        return {
            type: constants.CURRENT_USER_RECEIVED,
            profile: profile
        }
    }
    
}