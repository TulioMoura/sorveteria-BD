const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")

const cliente = sequelize.define('Cliente',{
    nome: {
        type:DataTypes.STRING,
        allowNull:false,
    }
        ,
    telefone : DataTypes.STRING,
    endereco : DataTypes.STRING,
    id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
}
})

module.exports  = cliente;