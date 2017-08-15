var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs')  //MUST HAVE bcrypt, THIS IS THE KEY
// var Profile = require('../models/Profile')
var controllers = require('../controllers')
var jwt = require('jsonwebtoken')

// router.post('/:action', function(req, res, next){
router.post('/login', function(req, res, next){
	// var action = req.params.action
	// if (action == 'login'){
        // var email = req.body.email
        // Profile.find()
        var credentials = req.body
        // console.log(JSON.stringify(credentials))
        controllers.profile
        .find({email: credentials.email}, true) //MISSING true HERE CAN CAUSE PROBLEM FOR SESSION TOKEN VERIFY
        .then(function(results){
        	if (results.length == 0){
                res.json({
                	confirmation: 'fail',
                	message: 'profile not found'
                })
                return
        	}
            
        	var profile = results[0]
        	// console.log(JSON.stringify(profile))
        	var passwordCompare = bcrypt.compareSync(credentials.password, profile.password)//(profile.password, credentails.password)
        	if (passwordCompare == false){
        		res.json({
        			confirmation: 'login fail',
        			message: 'password incorrect'
        		})
        		return
        	}

        	var token = jwt.sign({id:profile._id}, process.env.TOKEN_SECRET, {expiresIn: 4000})  //({id:result.id}
            req.session.token = token 

        	res.json({
        		confirmation: 'success',
        		token: token,
        		user: profile.summary() 
        	})
        	return
        })
        .catch(function(err){
            res.json({
            	confirmation: 'fail',
            	message: err.message
            })
        })
        return
	// }
})

router.get('/:action', function(req, res, next){
	var action = req.params.action

    if (action == 'logout'){
        req.session.token = null // req.session = reset()
        res.json({
            confirmation: 'success',
            message: 'user is logged out'
        })
    }

	if (action == 'currentuser'){
		if (req.session == null){
            res.json({
            	confirmation: 'no session',
            	user: null
            })
            return
		}

		if (req.session.token == null){
            res.json({
            	confirmation: 'no session token',
            	user: null
            })
            return
		}
        // console.log(req.session.token) 
        jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decoded){
            console.log('decoded: '+JSON.stringify(decoded))            
            if (err){
                req.session.reset()

                res.json({
                    confirmation: 'success',
                    user: 'null here'
                })
                return
            }

            // console.log('decoded.id: '+JSON.stringify(decoded.id))
            controllers.profile
            .findById(decoded.id, false)  //.getById(decoded.id)
            .then(function(profile){
                res.json({
                    confirmation: 'successes',
                    user: profile
                })
                return
            })
            .catch(function(error){
                res.json({
                    confirmation: 'fail',
                    message: error.message
                })
                return
            })
        }) 
	}
})

module.exports = router