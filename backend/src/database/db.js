const Sequelize = require("sequelize")
const path = require("path")
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: '../db/db.sqlite'
})
sequelize.sync().then(console.log("Database checked! "))

module.exports = sequelize