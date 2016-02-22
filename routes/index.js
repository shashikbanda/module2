var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt")

var knex = require('../db/knex')

router.get('/', function(req, res, next){
	res.render("home")
})

router.get('/login', function(req, res, next){
	if(req.signedCookies.userID === undefined){
		res.render("login")
	}
	else{
		res.redirect('/private/'+req.signedCookies.userID)
	}
})
router.post('/login', function(req,res,next){
	knex("users").where({email: req.body.email}).first().then(function(user){
		console.log(user)
    if(user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
      	console.log("user obj = " + user.userID)
        res.cookie('userID', user.userID, { signed: true });
        res.redirect('/private/' + user.userID);
      } else {
      	console.log("error with userpass")
      	res.redirect('/login')
      }
    } else {
    	console.log("error with userpass")
    	res.redirect('/login')
    }
  });
})

router.get('/logout', function(req, res, next){
  req.logout();
	res.clearCookie('userID');
  	res.redirect('/');
})
module.exports = router;


