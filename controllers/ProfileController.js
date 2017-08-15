var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {

    find: function(params, isRaw){
        return new Promise(function(resolve, reject){
        	Profile.find(params, function(err, profiles){
        		if (err){
        			reject(err)
        			return
        		}

        		if (isRaw == true){
        			resolve(profiles)
        			return
        		}

        		var summaries = []
        		profiles.forEach(function(profile){
                    summaries.push(profile.summary())
        		})

        		resolve(summaries)
        	})
        })
    },

    create: function(params){
    	return new Promise(function(resolve, reject){

            var password = params.password
            passwordHashed = bcrypt.hashSync(password, 10)
            params['password'] = passwordHashed    //params[password]

    		Profile.create(params, function(err, profile){
                if (err) {
                	reject(err)
                	return
                }

                // var password = params.password
                // passwordHashed = bcrypt.hashSync(password, 10)
                // params['password'] = passwordHashed    //params[password]
                resolve(profile.summary())
    		})
    	})
    },

    findById: function(id, isRaw){     //params NOT id
    	return new Promise(function(resolve, reject){
	    	Profile.findById(id, function(err, profile){  //params NOT id
	    		if (err) {
	    			reject(err)
	    			return 
	    		}

	    		if (isRaw == true){
	    			resolve(profile)
	    			return
	    		}

	            resolve(profile.summary())
	    	})	
    	})
    }
}