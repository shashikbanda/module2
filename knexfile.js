// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'meetup'
    }
  },
  production: {
    client: 'postgres',
    connection: {
    	database: 'meetup'
    }
  }
}