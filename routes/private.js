var express = require("express");
var router = express.Router();

var knex = require('../db/knex')

router.get('/:userID', function(req, res, next){
	var id = req.params.userID;
	knex('users').where({userID:id}).then(function(userObj){
		return userObj
	}).then(function(userObj){
		knex('photos').where({userID:id}).then(function(photoObj){
			res.render('privateProfile', {main_picture:userObj[0]['main_picture'], first_name:userObj[0]['first_name'], last_name:userObj[0]['last_name'], role:userObj[0]['role'], userID:userObj[0]['userID'], photoArray:photoObj})
		})
	})
})
router.post('/:userID', function(req, res, next){
	console.log("the userID passed from roleSelect = " + req.params.userID)
	if(req.session.passport !== undefined){
		var first_name = req.session.passport.user.name.givenName;
		var last_name = req.session.passport.user.name.familyName;
		var userEmail = req.session.passport.user.emails[0].value;
		var profPicLink = req.session.passport.user.photos[0].value;
		var id = req.session.passport.user.id;
		var role = req.body.role;
		var userCity = "San Francisco";
		knex('users').where({userID: id}).then(function(rows){
			if(rows.length === 0){
				knex('users').insert({userID:id, first_name: first_name, last_name: last_name, email: userEmail, 
										city: userCity, main_picture:profPicLink, role: role})
				.then(function(){
					res.redirect("/private/"+id);
				})
			}
			else{
				res.redirect("/private/"+id);
			}
		})
	}
	else{
		var id = req.params.userID;
		var role = req.body.role;
		console.log("role = " + role)

		knex('users').where({userID: req.params.userID}).insert({role:role}).then(function(rows){
			console.log("role should be added")
			res.redirect("/private/"+id);
			// if(rows.length === 0){
			// 	knex('users').insert({userID:id, first_name: firstname, last_name: lastname, email: email, 
			// 							city: city, main_picture:"", role: role})
			// 	.then(function(){
			// 		res.redirect("/private/"+id);
			// 	})
			// }
			// else{
			// 	res.redirect("/private/"+id);
			// }
		})
	}
	

})
module.exports = router;