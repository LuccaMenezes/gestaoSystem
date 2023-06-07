const mongoose = require('../db/conn')
const { Schema } = mongoose

const Products = mongoose.model(
   'Products',
   new Schema({
      code: {
         type: Number,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      unit: {
         type: Number,
         required: true,
      },
      minimumStock: {
         type: Number,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      subcategory: {
         type: String,
         required: true,
      },
      provider: {
         type: String,
         required: true,
      },
      purchasePrice: {
         type: Number,
         required: true,
      },
      salePrice: {
         type: Number,
         required: true,
      },
      margin: {
         type: String,
         required: true,
      },

   }, { timestamps: true }),
)

module.exports = Products