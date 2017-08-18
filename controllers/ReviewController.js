var Review = require('../models/Review')
var Promise = require('bluebird')

module.exports = {

	find: function(params, isRaw){                  //get: {
		return new Promise(function(resolve, reject){         
		    Review.find(params, function(err, reviews){  
		    	if (err){
		    		reject(err)
		    		return
		    	}

                if (isRaw){
                	resolve(reviews)
                	return
                }

                var summaries = []
                reviews.forEach(function(review){
                	summaries.push(review.summary())
                })
		    	
		    	resolve(summaries)
		    })
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){
			Review.create(params, function(err, review){
				if (err){
					reject(err)
					return
				} 
				resolve(review.summary())
			})
		})
	},

	findById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Review.findById(id, function(err, review){
				if (err) {
					reject(err)
					return
				}

				if (isRaw){
					resolve(review)
					return
				}

				resolve(review.summary())
				
			})
		})
	} 
}
