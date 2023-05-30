const mongoose = require('../db/conn')
const { Schema } = mongoose

const Products = mongoose.model(
   'Products',
   new Schema({
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      image: {
         type: String,
      },
      phone: {
         type: String,
         required: true,
      },
      company: {
         type: String,
         required: true,
      },
   }, { timestamps: true }),
)

module.exports = Products