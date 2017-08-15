var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){   //router.get('/', function(req, res, next){
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null) {
    	res.json({
    		confirmation: 'fail',
    		message: 'invalid resource'
    	})
    	return
    }

    controller.find(req.query, false) //controller.find(req.params)    
    .then(function(results){    //.return
    	res.json({
    	    confirmation: 'success',
            results: results
        })

    })    
    .catch(function(err){
        res.json({
        	confirmation: 'fail',
        	message: err
        })
    })
})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

	if (controller == null){
		res.json({
			confirmation: 'fail',
            message: 'invalid resource'
		})
		return
	}

	controller.create(req.body)
	.then(function(result){   //.then(function(bug){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
            confirmation: 'fail',
            message: err
		})
	})
})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

	if (controller == null) {
		res.json({
			confirmation: 'fail',
			message: 'invalid resource'
		})
		return
	}

	var id = req.params.id
	controller.findById(id, false)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})

module.exports = router