const express = require("express")
let router = express.Router()
const pedidos = require("./pedidos")
const produtos = require("./produtos")
const clientes = require("./clientes")
const fornecedores = require("./fornecedores")
const fornecimentos = require("./fornecimentos")
const confeitarias = require("./confeitarias")

router.use("/pedidos",pedidos)
router.use("/produtos",produtos)
router.use("/clientes",clientes)
router.use("/fornecedores",fornecedores)
router.use("/fornecimentos",fornecimentos)
router.use("/confeitarias",confeitarias)

module.exports = router