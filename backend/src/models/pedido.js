const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")

const pedido = sequelize.define('Pedido',{
    valor_total:{
        type:DataTypes.FLOAT,
        allowNull:false

    },
    id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    idCliente:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports  = pedido;