const Sequelize = require("sequelize")
const path = require("path")
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING)
sequelize.sync().then(console.log("Database checked! "))

module.exports = sequelize