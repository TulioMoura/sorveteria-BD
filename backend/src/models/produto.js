const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")
const Produto = sequelize.define('Produto',{
    sabor: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    tipo: DataTypes.STRING,
    estoque:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    preco : DataTypes.FLOAT,
    id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
}
})
module.exports  = Produto;