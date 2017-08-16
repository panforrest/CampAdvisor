var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs')  //MUST HAVE bcrypt, THIS IS THE KEY
// var Profile = require('../models/Profile')
var controllers = require('../controllers')
var jwt = require('jsonwebtoken')
var utils = require('../utils')

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
        var token = req.session.token
        utils.JWT.verify(token, process.env.TOKEN_SECRET)               // var secret = utils.JWT.verify()
        .then(function(decode){ //.then(function(token){
            // res.json({
            //  confirmation: 'success',
            //  token: decode,    //token: token
            //  // profile: profile
            // })
            return controllers.profile.findById(decode.id)   //controllers.profile.findById(decode.id)
        })
        .then(function(profile){
            res.json({
                confirmation: 'success',
                profile: profile
            })
        })
        .catch(function(err){
            res.json({
                confirmation: 'success',
                message: 'invalid token'
            })
        })
    }
})

router.post('/register', function(req, res, next){

    controllers.profile   //controller.profile

    // console.log(JSON.stringify(req.body))
    .create(req.body) //create(req.body) 
    .then(function(profile){  //.then(function(result){
        //var token = jwt.sign({id:profile._id}, process.env.TOKEN_SECRET, {expiresIn: 4000})  //({id:result.id}
        var token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
        req.session.token = token 

        res.json({
            confirmation: 'success',
            profile: profile,  //result: result
            token: token
        })

    })
    .catch(function(err){
        if (err) {
            res.json({
                confirmation: 'fail',
                err: err.message
            })
        }
    })  
})

module.exports = router