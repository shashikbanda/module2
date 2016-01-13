var express = require("express");
var router = express.Router();

var knex = require('../db/knex')

router.get('/:userID', function(req, res, next){
	var id = req.params.userID;
	knex('users').where({userID:id}).then(function(userObj){
		// res.render('privateProfile', {main_picture:userObj[0]['main_picture'], first_name:userObj[0]['first_name'], last_name:userObj[0]['last_name'], role:userObj[0]['role'], userID:userObj[0]['userID']})
		return userObj
	}).then(function(userObj){
		knex('photos').where({userID:id}).then(function(photoObj){
			// console.log(photoObj)
			// res.send(photoObj)
			res.render('privateProfile', {main_picture:userObj[0]['main_picture'], first_name:userObj[0]['first_name'], last_name:userObj[0]['last_name'], role:userObj[0]['role'], userID:userObj[0]['userID'], photoArray:photoObj})
		})
	})
})
router.post('/:userID', function(req, res, next){
	var first_name = req.session.passport.user.name.givenName;
	var last_name = req.session.passport.user.name.familyName;
	var userEmail = req.session.passport.user.emails[0].value;
	var profPicLink = req.session.passport.user.photos[0].value;
	var facebookID = req.session.passport.user.id;
	var userCity = "San Francisco";
	var role = req.body.role;

	// knex('users').whereNot({userID: facebookID}).insert({userID:facebookID,
	// 	first_name: first_name, last_name: last_name, email: userEmail, 
	// 		city: userCity, main_picture:profPicLink, role: role})
	// 	.then(function(){
	// 		res.redirect("/private/"+facebookID);
	// })
	res.redirect("/private/"+facebookID)
})
module.exports = router;