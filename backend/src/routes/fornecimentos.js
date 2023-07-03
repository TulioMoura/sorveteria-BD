const express = require("express")
const router = express.Router()
const model_fornecimento = require("../models/fornecimento");
const model_produto = require("../models/produto")
const model_fornecedor = require("../models/fornecedor")

const {v4:uuidv4}= require("uuid")

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
    let fornecimentoList = await model_fornecimento.findAll({whrere:{cnpjFornecedor:cnpjFornecedor}});
    res.send(fornecimentoList)
})

router.get('/por/fornecedor',async(req,res)=>{
    const {cnpjFornecedor} = req.body
    let fornecimentoList = await model_fornecimento.findAll({whrere:{cnpjFornecedor:cnpjFornecedor}});
    res.send(fornecimentoList)
})

router.get('/por/produto',async(req,res)=>{
    const {produtoId} = req.body
    let fornecimentoList = await model_fornecimento.findAll({whrere:{produtoId:produtoId}});
    res.send(fornecimentoList)
})

router.post('/', async(req,res)=>{
    let fornecimento;
    try{
       const {produtoId,cnpjFornecedor,quantidade,valorTotal} =  req.body
      fornecimento = {produtoId,cnpjFornecedor,quantidade,valorTotal}
        await model_fornecimento.create(fornecimento)
        res.send(200)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {id,produtoId, cnpjFornecedor,quantidade,valorTotal} =  req.body  
     if(!model_fornecimento.findByPk(id)){
      throw new Error()
     }
     model_fornecimento.update(
        {
            produtoId:produtoId,
            cnpjFornecedor:cnpjFornecedor,
            quantidade:quantidade,
            valorTotal:valorTotal},
        {where:{id:id}})
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
     await model_fornecimento.destroy({where:{id:id}})
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router