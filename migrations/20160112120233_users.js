
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable("users", function(table){
  		// table.increments();
  		table.string('email').primary();
  		table.string('name');
  		table.string('main_picture')
  	}),
  	knex.schema.createTable("photos", function(table){
  		table.string("email").references('email').inTable("users"); //REFERENCES USERS TABLE
  		table.string('photo');
  	})])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable("users"),
		knex.schema.dropTable("photos")
	])
};
