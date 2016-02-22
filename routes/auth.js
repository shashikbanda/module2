var express = require("express");
var router = express.Router();
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var cookieSession = require("cookie-session")
var knex = require('../db/knex');

passport.use(new FacebookStrategy({
	clientID:"1700367380186405",
	clientSecret:"e51788f34365250fc6d520d92ae648d5",
	callbackURL: "http://localhost:3000/auth/facebook/callback",
	profileFields: ['id', 'name', 'photos', 'emails']
},
function(accessToken, refreshToken, profile, done) {
	return done(null, profile);
  }
))

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

router.get('/facebook', passport.authenticate('facebook', { scope: 'email'}));
router.get('/facebook/callback', passport.authenticate('facebook', { 
									successRedirect: '/auth/success',
                                    failureRedirect: '/' }));
router.get('/success', function(req, res, next){
	var id = req.session.passport.user.id;
	knex('users').where({userID: id}).then(function(rows){
		if(rows.length === 0){
			res.redirect("/signup/roleSelect/"+id)
		}
		else{
			res.redirect("/private/"+id);
		}
	})
})
router.get('/logout', function(req, res, next){
	req.logout();
	res.clearCookie('userID');
  	res.redirect('/');
})
module.exports = {
	router:router,
	passport:passport
};