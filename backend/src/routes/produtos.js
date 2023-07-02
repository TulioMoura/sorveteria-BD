const express = require("express")
const router = express.Router()
const model_produto = require("../models/produto");
const {v4:uuidv4}= require("uuid")

router.get('/',async(req,res)=>{
    let lista_produtos = await model_produto.findAll();
    res.send(lista_produtos)
})

router.post('/', async(req,res)=>{
    let produto;
    try{
       const {sabor,preco,tipo} =  req.body
       const id = uudiv4()
       produto = {sabor,preco,tipo,id}            
        await model_produto.create(produto)
        res.send(200)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {sabor,preco,tipo,id}  =  req.body  
     if(!model_produto.findByPk(id)){
      throw new Error()
     }
     model_produto.update({sabor:sabor,preco:preco,tipo:tipo},{where:{id:id}})
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
     await model_produto.destroy({where:{id:id}})
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router