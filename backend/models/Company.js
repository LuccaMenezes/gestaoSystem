const mongoose = require('../db/conn')
const { Schema } = mongoose

const Company = mongoose.model(
   'Company',
   new Schema({
      nameCompany: {
         type: String,
         required: true,
      },
      cnpj: {
         type: String,
         required: true,
      },
      cep: {
         type: String,
         required: true,
      },
      city: {
         type: String,
         required: true,
      },
      state: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: true,
      },
      addressNumber: {
         type: Number,
         required: true,
      },
      neighborhood: {
         type: String,
         required: true,
      },
      image: {
         type: String,
      },
   }, { timestamps: true }),
)

module.exports = Company