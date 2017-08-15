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
    }
    
}