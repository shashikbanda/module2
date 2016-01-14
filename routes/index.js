var express = require("express");
var router = express.Router();

var knex = require('../db/knex')

router.get('/', function(req, res, next){
	res.render("home")//MAIN PAGE EJS FILE GOES HERE
})
router.get('/signup/roleSelect/:userID', function(req, res, next){
	var id = req.params.userID;
	console.log("id passed to signup/rolselect = " + id)
	res.render("roleSelect",{userID:id})
})
router.get('/signup/email', function(req, res, next){
	res.render('signup')
})
router.post('/signup/email', function(req, res, next){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var city = req.body.city;
	var email = req.body.email;
	var id = 593037892;

	knex('users').where({email:email}).then(function(rows){
		if(rows.length === 0){ //SAYS EMAIL IS UNIQUE, CREATE ACCOUNT
			knex('users').insert({userID:id, first_name: firstname, last_name: lastname, email: email, city: city}).then(function(check){
				res.redirect("/signup/roleSelect/"+id)
			})
		}
		else{ //EMAIL ALREADY IN DATABASE
			console.log("email is already in use")
		}
	})
})
module.exports = router;

