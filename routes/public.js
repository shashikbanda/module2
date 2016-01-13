var express = require("express");
var router = express.Router();

var knex = require('../db/knex')

router.get('/:userID', function(req, res, next){
	var id = req.params.userID;
	knex('users').where({userID:id}).then(function(userObj){
		res.render('publicProfile', {main_picture:userObj[0]['main_picture'], first_name:userObj[0]['first_name'], last_name:userObj[0]['last_name'], role:userObj[0]['role'], userID:userObj[0]['userID']})
	})
})

module.exports = router;