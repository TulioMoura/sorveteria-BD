const Sequelize = require("sequelize")
const path = require("path")
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING)
sequelize.sync().then(console.log("Database checked! "))

sequelize.query(`CREATE OR REPLACE PROCEDURE resetLucro() 

as $$
	BEGIN
	update Produtos
	set lucro = 0.15;
END;
$$ 
language plpgsql;

`).then(v=> console.log("Procedure criada"))
module.exports = sequelize