const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")
const Pedido = require("./pedido.js")
const Produto = require("./produto.js")

const itemPedido = sequelize.define('itemPedido',{
    produtoId:{
        type:DataTypes.STRING,
        references:{
            model:Produto,
            key:"id"
        },
        allowNull:false
    },

    pedidoId:{
        type: DataTypes.STRING,
        references:{
            model: Pedido,
            key:'id'
        },
        allowNull:false
    },
    quantidade:{
        type:DataTypes.FLOAT,
        defaultValue:1,
        allowNull:false
    },
    valor:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
}
)

itemPedido.belongsTo(Produto,{as:'Produto',foreignKey:'produtoId'})
itemPedido.belongsTo(Pedido,{as:'Pedido',foreignKey:'pedidoId'})

module.exports  = itemPedido;