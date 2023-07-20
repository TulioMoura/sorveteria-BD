const express = require("express")
const router = express.Router()
const model_produto = require("../models/produto")
const model_pedido  = require("../models/pedido")
const model_item_pedido = require("../models/item_pedido")

const {v4:uuidv4}= require("uuid");
const fornecimento = require("../models/fornecimento");
const sequelize = require("../database/db")

router.get('/',async(req,res)=>{
    try{
        const {id} = req.body
        if(!id){
            let pedidosList = await model_pedido.findAll();
            res.send(pedidosList)
        }
        else{
            let pedido = await model_pedido.findByPk(id)
            let itens = await model_item_pedido.findAll({where:{pedidoId:id}})
            res.send({pedido,itens})
        }
    }
    catch(err){
        console.log(err)
        res.send(500,"Erro interno do servidor")
    }
    
})

router.get('/por/cliente',async(req,res)=>{
    try{
        const {idCliente} = req.body
    let pedidosList = await model_pedido.findAll({where:{idCliente:idCliente}});
    res.send(pedidosList)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.get('/por/produto',async(req,res)=>{
    try{
    const {produtoId} = req.body
    let itens_match = await model_item_pedido.findAll({where:
    {produtoId:produtoId}});
    let pedidos = [];
    itens_match.forEach(item=>{
        pedidos.push(model_pedido.findByPk(item.pedidoId))
    })


    res.send(pedidos)}
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
})

router.post('/', async(req,res)=>{
    let pedido;
    try{

        const transaction = await sequelize.transaction();
        const idPedido =  uuidv4()
       const {idCliente,itens} =  req.body

       let pedido = await model_pedido.create({idCliente:idCliente,id:idPedido,valor_total:0},{transaction:transaction})
       let valor_pedido = 0

       for(const item of itens){
        produto = await model_produto.findByPk(item.produtoId)

        if(produto.estoque < item.quantidade || !produto){
             transaction.rollback();
             throw new Error();
        }

        valor = (produto.preco +(produto.preco*produto.lucro))* item.quantidade 
        await model_produto.update({estoque:produto.estoque-item.quantidade},{where:{id:item.produtoId}},{transaction:transaction})
       await model_item_pedido.create({pedidoId:idPedido,produtoId:item.produtoId,quantidade:item.quantidade,valor: valor},{transaction:transaction}) 
       valor_pedido = valor_pedido+ valor

       };
       console.log(idPedido + "  " + valor_pedido)
       
       await transaction.commit();
        await model_pedido.update({valor_total:valor_pedido}, {where:{id:idPedido}})
       pedido = await model_pedido.findByPk(idPedido)
      await res.status(200).send(pedido)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

/*router.patch('/', async(req,res)=>{
  try{
     const {id,quantidade,valorTotal} =  req.body  
     fornecimento = model_fornecimento.findByPk(id)
     if(!fornecimento){
      throw new Error()
     }
     if(quantidade<1){
        throw new Error()
      }
      
     model_fornecimento.update(
        {
            quantidade:quantidade,
            valorTotal:valorTotal},
        {where:{id:id}})
        if(quantidade){
            produto = model_produto.findByPk(fornecimento.produtoId)
            quant_produto = produto.quantidade - fornecimento.quantidade + quantidade
            model_produto.update({quantidade:quant_produto},{where:{id:produtoId}})
        }
        
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})
*/

router.delete('/', async(req,res)=>{
  try{
     const {id} =  req.body  
     let pedido = model_pedido.findByPk(id)
     await model_item_pedido.destroy({where:{pedidoId:id}} )
     await model_pedido.destroy({where:{id:id}})
     
    res.status(200).send(pedido)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router