const Product = require('../models/Products')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class ProductController {

   static async register(req, res) {

      const { code, description, unit, minimumStock, category, subcategory, provider, purchasePrice, salePrice, margin } = req.body

      function validateField(value, errorMessage) {
         if (!value) {
            res.status(422).json({ message: errorMessage });
            return true;
         }
         return false;
      }

      if (validateField(code, 'Informe o código do produto!')) {
         return;
      }

      if (validateField(description, 'Informe a descrição do produto!')) {
         return;
      }

      if (validateField(unit, 'Informe quantas unidades tem o produto!')) {
         return;
      }

      if (validateField(minimumStock, 'Informe o estoque mínimo do produto!')) {
         return;
      }

      if (validateField(category, 'Informe a categoria do produto!')) {
         return;
      }

      if (validateField(subcategory, 'Informe a subcategoria do produto!')) {
         return;
      }

      if (validateField(provider, 'Informe o fornecedor do produto!')) {
         return;
      }

      if (validateField(purchasePrice, 'Informe o preço de compra do produto!')) {
         return;
      }

      if (validateField(salePrice, 'Informe o preço de venda do produto!')) {
         return;
      }

      // check if product exists
      const ProductExists = await Product.findOne({ code: code })

      if (ProductExists) {
         res.status(422).json({ message: `Produto com o código: ${code} já cadastrado!` });
         return
      }

      // create product
      const product = new Product({
         code,
         description,
         unit,
         minimumStock,
         category,
         subcategory,
         provider,
         purchasePrice,
         salePrice,
         margin,
      })

      try {
         await product.save();
         res.status(200).json({ message: 'Produto cadastrado com sucesso!' })

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }

   static async getAll(req, res) {
      const product = await Product.find().sort('-createdAt')
      res.status(200).json({
         product: product,
      })
   }

   static async getProductById(req, res) {

      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      //check if product exists
      const product = await Product.findOne({ _id: id })

      if (!product) {
         res.status(404).json({ message: 'Produto não encontrado!' })
      }

      res.status(200).json({
         product: product,
      })
   }

   static async removeProductById(req, res) {
      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      //check if product exists
      const product = await Product.findOne({ _id: id })

      if (!product) {
         res.status(404).json({ message: 'Produto não encontrado!' })
         return
      }

      await Product.findByIdAndRemove(id)
      res.status(200).json({ message: 'Produto removido com sucesso!' })
   }

   static async updateProduct(req, res) {
      const id = req.params.id

      const { code, description, unit, minimumStock, category, subcategory, provider, purchasePrice, salePrice, margin } = req.body

      const updatedData = {}

      function validateField(value, errorMessage) {
         if (!value) {
            res.status(422).json({ message: errorMessage });
            return true;
         }
         return false;
      }

      // check if product exists
      const product = await Product.findOne({ _id: id })

      if (!product) {
         res.status(404).json({ message: 'Produto não encontrado!' })
         return
      }

      //validations
      if (validateField(code, 'Informe o código do produto!')) {
         return;
      } else {
         updatedData.code = code
      }

      if (validateField(description, 'Informe a descrição do produto!')) {
         return;
      } else {
         updatedData.description = description
      }

      if (validateField(unit, 'Informe quantas unidades tem o produto!')) {
         return;
      } else {
         updatedData.unit = unit
      }

      if (validateField(minimumStock, 'Informe o estoque mínimo do produto!')) {
         return;
      } else {
         updatedData.minimumStock = minimumStock
      }

      if (validateField(category, 'Informe a categoria do produto!')) {
         return;
      } else {
         updatedData.category = category
      }

      if (validateField(subcategory, 'Informe a subcategoria do produto!')) {
         return;
      } else {
         updatedData.subcategory = subcategory
      }

      if (validateField(provider, 'Informe o fornecedor do produto!')) {
         return;
      } else {
         updatedData.provider = provider
      }

      if (validateField(purchasePrice, 'Informe o preço de compra do produto!')) {
         return;
      } else {
         updatedData.purchasePrice = purchasePrice
      }

      if (validateField(salePrice, 'Informe o preço de venda do produto!')) {
         return;
      } else {
         updatedData.salePrice = salePrice
      }

      if (validateField(margin, 'Informe a margem do produto!')) {
         return;
      } else {
         updatedData.margin = margin
      }

      await Product.findByIdAndUpdate(id, updatedData)

      res.status(200).json({ message: 'Produto atualizado com sucesso!' })
   }
}