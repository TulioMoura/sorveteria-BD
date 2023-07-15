const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")
const Produto = sequelize.define('Produto',{
    sabor: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    tipo: DataTypes.STRING,
    estoque: {
        type:DataTypes.FLOAT,
        defaultValue:0
    },
    preco : DataTypes.FLOAT,
    lucro : {
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0.15,
    },
    id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
}
})
module.exports  = Produto;