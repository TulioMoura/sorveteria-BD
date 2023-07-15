const express = require("express")
const router = express.Router()
const model_produto = require("../models/produto");
const {v4:uuidv4}= require("uuid")

router.get('/',async(req,res)=>{

    try{
        const {id} = req.body
        if(!id){
            let lista_produtos = await model_produto.findAll();
            res.send(lista_produtos)
        }
        else{
            let produto = await model_produto.findByPk(id)
            res.send(produto)
        }
    }
    catch(err){
        console.log(err)
        res.send(500,"Erro interno do servidor")
    }
})

router.post('/', async(req,res)=>{
    let produto;
    try{
       const {sabor,preco,tipo,lucro} =  req.body
       const id = uuidv4()
       produto = {sabor,preco,tipo,id,lucro}            
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
     const {sabor,preco,tipo,id,lucro}  =  req.body  
     if(!model_produto.findByPk(id)){
      throw new Error()
     }
     model_produto.update({sabor:sabor,preco:preco,tipo:tipo,lucro:lucro},{where:{id:id}})
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