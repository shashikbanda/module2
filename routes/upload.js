var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var imgurUploader = require("imgur-uploader")
var knex = require('../db/knex');

var imageArray = [];

router.get('/', function(req, res, next){
	res.render("index")
});

router.post('/upload', function(req, res, next){
	var fileName = req.file.filename;
	var filePath = req.file.path;
	var uploadsLocation = path.join(TARGET_PATH, fileName)

	imgurUploader(fs.readFileSync(uploadsLocation)).then(data => {
		imageArray.push(data.link)
		return imageArray;
	}).then(function(imageArray){
		res.render("uploads",{images:imageArray}) 		
	})
})

router.get('/profile', function(req, res, next){
	knex('users').insert({photo1: imageArray}).then(function(){
			res.render("profile", {image: imageArray})
		})
})
module.exports = router;