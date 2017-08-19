var express = require('express')
var webpack = require("webpack");
var path = require('path')

module.exports = {
	entry: {    //input:
        app: './src/app.js'    //app: '/src/app.js'
	},

	output: {
		filename: './public/dist/bundle.js',
		sourceMapFilename: './public/dist/bundle.app.js'   //mapping file: './public/dist/bundle.map.js'
	},

	devtool: '$source-map',

	module: {
        loaders: [
            {
	            loader: 'babel-loader',
	            test: /\.js?$/,
	            exclude: /(node-module)/,
	            query: {
	            	presets: ['react', 'es2015']
	            }
            } 
        ]
	}
}