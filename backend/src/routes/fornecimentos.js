const express = require("express")
const router = express.Router()
const model_fornecimento = require("../models/fornecimento");
const model_produto = require("../models/produto")
const model_fornecedor = require("../models/fornecedor")

const {v4:uuidv4}= require("uuid");
const fornecimento = require("../models/fornecimento");

router.get('/',async(req,res)=>{
    try{
        const {id} = req.body
        if(!id){
            let fornecimentoList = await model_fornecimento.findAll();
            res.send(fornecimentoList)
        }
        else{
            let fornecimento = await model_fornecimento.findByPk(id)
            res.send(fornecimento)
        }
    }
    catch(err){
        console.log(err)
        res.send(500,"Erro interno do servidor")
    }
    
})

router.get('/por/fornecedor',async(req,res)=>{
    const {cnpjFornecedor} = req.body
    let fornecimentoList = await model_fornecimento.findAll({where:{cnpjFornecedor:cnpjFornecedor}});
    res.send(fornecimentoList)
})


router.get('/por/produto',async(req,res)=>{
    const {produtoId} = req.body
    let fornecimentoList = await model_fornecimento.findAll({where:{produtoId:produtoId}});
    res.send(fornecimentoList)
})

router.post('/', async(req,res)=>{
    let fornecimento;
    try{
       const {produtoId,cnpjFornecedor,quantidade,valorTotal} =  req.body
      fornecimento = {produtoId,cnpjFornecedor,quantidade,valorTotal}
      if(quantidade<1){
        throw new Error()
      }
        await model_fornecimento.create(fornecimento)
        produto = await model_produto.findByPk(produtoId)

        await model_produto.update({estoque: (produto.estoque+quantidade)},{where:{id:produtoId}})
        res.send(200)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {id,quantidade,valorTotal} =  req.body  
     let fornecimento = model_fornecimento.findByPk(id)
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
            quant_produto = produto.estoque - fornecimento.quantidade + quantidade
            model_produto.update({quantidade:quant_produto},{where:{id:fornecimento.produtoId}})
        }
        
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

router.delete('/', async(req,res)=>{
  try{
     const {id} =  req.body  
     let fornecimento = await model_fornecimento.findByPk(id);
     
     let produto = await model_produto.findByPk(fornecimento.produtoId)
     await model_produto.update({estoque:(produto.estoque - fornecimento.quantidade)},{where:{id:produto.id}})
    await model_fornecimento.destroy({where:{id:id}})
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router