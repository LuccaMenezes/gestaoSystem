const mongoose = require('../db/conn')
const { Schema } = mongoose

const Provider = mongoose.model(
   'Provider',
   new Schema({
      company: {
         type: String,
         required: true,
      },
      cnpj: {
         type: String,
         required: true,
      },
      contact: {
         type: String,
         required: true,
      },
      sector: {
         type: String,
         required: true,
      },
      businessLine: {
         type: String,
         required: true,
      },
      phone: {
         type: String,
         required: true,
      },
      email: {
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
   }, { timestamps: true }),
)

module.exports = Provider