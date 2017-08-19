var express = require('express');
var router = express.Router();

require('node-jsx').install({ extension: '.js'})
var React = require('react')
var ReactDOMServer = require('react-dom/server')

var ServerApp = require('../public/dist/es5/ServerApp')
//console.log(ServerApp)
router.get('/', function(req, res, next) {


	//convert react code into HTML:
    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:'home'}))
    res.render('index', { react: html })

});

router.get('/:page', function(req, res, next) {
    var page = req.params.page

	//convert react code into HTML:
    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page}))
    //
    res.render(page, { react: html });

});

router.get('/:page/:slug', function(req, res, next) {
    var page = req.params.page
    if (page == 'api' || page == 'account' || page == 'home' || page == 'index'){
    	next()
    	return
    }

    var slug = req.params.slug

	//convert react code into HTML:
	// console.log(page)
	// console.log(slug)
	// console.log(ServerApp)
    var html = ReactDOMServer.renderToString(React.createElement(ServerApp, {page:page, slug:slug}))
    // console.log(page)
    // console.log(slug)
    // console.log(ServerApp)
    res.render(page, { react: html });

});


module.exports = router;
