var express = require("express");
var router = express.Router();

var knex = require('../db/knex')

router.get('/', function(req, res, next){
	res.render("home")//MAIN PAGE EJS FILE GOES HERE
})

router.get('/signup/roleSelect/:userID', function(req, res, next){
	var id = req.params.userID;
	res.render("roleSelect",{userID:id})
	// knex('users').where({userID:id}).then(function(userObj){
	// 	res.render('roleSelect');
	// 	// {main_picture:userObj[0]['main_picture'], first_name:userObj[0]['first_name'], last_name:userObj[0]['last_name'], role:userObj[0]['role'], userID:userObj[0]['userID']})
	// })
})
module.exports = router;

