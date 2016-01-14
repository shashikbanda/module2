
exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.createTable("users", function(table){
	  	// table.increments();
	    table.string('userID').nullable().primary();
	    table.string('first_name');
	    table.string('last_name');
	    table.string('password');
	  	table.string('email');
	  	table.string('city');
	  	table.string('main_picture');
	  	table.string('role');
  	}),
  	knex.schema.createTable("photos", function(table){
      	// table.increments();
		table.string("userID").references('userID').inTable("users"); //REFERENCES USERS TABLE
		table.string('photo');
  	})])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable("users"),
		knex.schema.dropTable("photos")
	])
};
