var Camp = require('../models/Camp')
var Promise = require('bluebird')

module.exports = {

	find: function(params, isRaw){                  //get: {
		return new Promise(function(resolve, reject){         
		    Camp.find(params, function(err, camps){if (err){
		    		reject(err)
		    		return
		    	}

                if (isRaw){
                	resolve(camps)
                	return
                }

                var summaries = []
                camps.forEach(function(camp){
                	summaries.push(camp.summary())
                })
		    	
		    	resolve(summaries)
		    })
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){
			Camp.create(params, function(err, camp){
				if (err){
					reject(err)
					return
				} 
				resolve(camp)    
			})
		})
	},

	findById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Camp.findById(id, function(err, camp){
				if (err) {
					reject(err)
					return
				}

				if (isRaw){
					resolve(camp)
					return
				}

				resolve(camp.summary())
				
			})
		})
	} 
}
