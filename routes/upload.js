var express = require("express");
var router = express.Router();
var path = require('path');
var fs = require("fs");
var multer = require("multer")
var imgurUploader = require('imgur-uploader');
var knex = require('../db/knex');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    //ADD LOGIC TO CHECK FOR ALL IMAGES TYPES, RIGHT NOW ONLY APPENDING JPG
    cb(null, file.fieldname + '-' + Date.now() + ".jpg")
  }
})
var upload = multer({storage: storage})
var imageArray = [];
var TARGET_PATH = path.resolve(__dirname, '../uploads/');

router.get('/', function(req, res, next){
	res.render("index") // RENAME TO upload, index page for upload functionality
})

router.post('/continue', upload.single('file'), function(req, res, next){
	var fileName = req.file.filename;
	var filePath = req.file.path;
	var uploadsLocation = path.join(TARGET_PATH, fileName)
	var currentUserId = req.session.passport.user.id;

	imgurUploader(fs.readFileSync(uploadsLocation)).then(data => {
			imageArray.push(data.link)
			knex('photos').where({userID:currentUserId}).insert({userID:currentUserId,photo:data.link}).then(function(photoObj){
				res.render("uploads", {userID:currentUserId})
			})
    })
})

router.get('/view', function(req,res,next){
	res.render("profile", {image:imageArray})

})

module.exports = router;