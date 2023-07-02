const sequelize = require("../database/db")
const {DataTypes} = require("sequelize")
const Fornecedor = require("./fornecedor.js")
const Produto = require("./produto.js")

const fornecimento = sequelize.define('Fornecimento',{
    produtoId:{
        type:DataTypes.STRING,
        references:{
            model:Produto,
            key:"id"
        },
        allowNull:false
    },

    cnpjFornecedor:{
        type: DataTypes.STRING,
        references:{
            model: Fornecedor,
            key:'cnpj'
        },
        allowNull:false
    },
    quantidade:{
        type:DataTypes.INTEGER,
        defaultValue:1,
        allowNull:false
    },
    valorTotal:{
        type:DataTypes.FLOAT,
        defaultValue:0,
        allowNull:false
    }
}
)

fornecimento.belongsTo(Produto,{as:'Produto',foreignKey:'produtoId'})
fornecimento.belongsTo(Fornecedor,{as:'Fornecedor',foreignKey:'cnpjFornecedor'})

module.exports  = fornecimento;