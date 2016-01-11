//Dependencies
var fs = require('fs');
var path = require('path');
var uid = require('uid2');
var mime = require('mime');
var imgurUploader = require("imgur-uploader")

//Constants
var TARGET_PATH = path.resolve(__dirname, '../uploads/');
module.exports = {
	index: function(req, res, next){
		res.render("index")
	},
	upload: function(req, res,next){
		var fileName = req.file.filename;
		var filePath = req.file.path;
		var uploadsLocation = path.join(TARGET_PATH, fileName)
		imgurUploader(fs.readFileSync(uploadsLocation)).then(data => {
			console.log(data); //data.link will go to database
    	})
    }
}
