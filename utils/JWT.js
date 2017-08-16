var jwt = require('jsonwebtoken') //var session = require('client-sessions')
var Promise = require('bluebird')


module.exports = {
	sign: function(obj, secret){
        return jwt.sign(obj, secret)
	},

	verify: function(token, secret){   //verify: function(obj, secret){
        return new Promise(function(resolve, reject){
        	jwt.verify(token, secret, function(err, decode){   //jwt.verify(token, secret, function(err, response){
                if (err) {
                	reject(err)
                	return
                }
                resolve(decode)
        	})
        })
	}
}