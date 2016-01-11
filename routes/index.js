//Dependencies
var fs = require('fs');
var path = require('path');
var uid = require('uid2');
var mime = require('mime');

//Constants
// var TARGET_PATH = path.resolve(__dirname, '../uploads/');

module.exports = {
	index: function(req, res, next){
		res.render("index")
	},
	upload: function(req, res,next){
		var is;
		var os;

		var targetPath;
		var targetName; 
    }
}
