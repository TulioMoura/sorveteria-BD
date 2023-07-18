const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")
const cliente = require("./cliente.js")

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

pedido.belongsTo(cliente, {as:'cliente',foreignKey:"idCliente"})
module.exports  = pedido;