const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")

const Fornecedor = sequelize.define('Fornecedor',{
    nome: {
        type:DataTypes.STRING,
        allowNull:false,
    }
        ,
    telefone : DataTypes.STRING,
    cnpj: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
}
})
module.exports  = Fornecedor;