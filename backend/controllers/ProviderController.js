const Provider = require('../models/Provider');
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class ProviderController {

   static async register(req, res) {

      const { company, cnpj, contact, sector, businessLine, phone, email, cep, city, state, address, addressNumber } = req.body

      function validateField(value, errorMessage) {
         if (!value) {
            res.status(422).json({ message: errorMessage });
            return true;
         }
         return false;
      }

      if (validateField(cnpj, 'O cnpj é obrigatório!')) {
         return;
      }

      if (validateField(contact, 'O nome do contato é obrigatório!')) {
         return;
      }

      if (validateField(phone, 'O telefone é obrigatório!')) {
         return;
      }

      if (validateField(email, 'O e-mail é obrigatório!')) {
         return;
      }

      if (validateField(sector, 'O setor é obrigatório!')) {
         return;
      }

      if (validateField(company, 'O nome da empresa é obrigatório!')) {
         return;
      }

      if (validateField(businessLine, 'O ramo de atuação é obrigatório!')) {
         return;
      }

      if (validateField(cep, 'O cep é obrigatório!')) {
         return;
      }

      if (validateField(address, 'O endereço é obrigatório!')) {
         return;
      }

      if (validateField(addressNumber, 'O número do endereço é obrigatório!')) {
         return;
      }

      if (validateField(city, 'A cidade é obrigatória!')) {
         return;
      }

      if (validateField(state, 'O estado é obrigatório!')) {
         return;
      }


      // check if provider exists
      const ProviderExists = await Provider.findOne({ cnpj: cnpj })

      if (ProviderExists) {
         res.status(422).json({ message: `Fornecedor com o cnpj: ${cnpj} já cadastrado!` });
         return
      }

      // create provider
      const provider = new Provider({
         company,
         cnpj,
         contact,
         sector,
         businessLine,
         phone,
         email,
         cep,
         city,
         state,
         address,
         addressNumber,
      })

      try {
         await provider.save();
         res.status(200).json({ message: 'Fornecedor cadastrado com sucesso!' })

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }

   static async getAll(req, res) {
      const provider = await Provider.find().sort('-createdAt')
      res.status(200).json({
         provider: provider,
      })
   }

   static async getProviderById(req, res) {

      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      //check if provider exists
      const provider = await Provider.findOne({ _id: id })

      if (!provider) {
         res.status(404).json({ message: 'Fornecedor não encontrado!' })
      }

      res.status(200).json({
         provider: provider,
      })
   }

   static async removeProviderById(req, res) {
      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      //check if provider exists
      const provider = await Provider.findOne({ _id: id })

      if (!provider) {
         res.status(404).json({ message: 'Fornecedor não encontrado!' })
         return
      }

      await Provider.findByIdAndRemove(id)
      res.status(200).json({ message: 'Fornecedor removido com sucesso!' })
   }

   static async updateProvider(req, res) {
      const id = req.params.id

      const { company, cnpj, contact, sector, businessLine, phone, email, cep, city, state, address, addressNumber } = req.body

      const updatedData = {}

      function validateField(value, errorMessage) {
         if (!value) {
            res.status(422).json({ message: errorMessage });
            return true;
         }
         return false;
      }

      // check if provider exists
      const provider = await Provider.findOne({ _id: id })

      if (!provider) {
         res.status(404).json({ message: 'Fornecedor não encontrado!' })
         return
      }

      //validations
      if (validateField(cnpj, 'O cnpj é obrigatório!')) {
         return;
      } else {
         updatedData.cnpj = cnpj
      }

      if (validateField(contact, 'O nome do contato é obrigatório!')) {
         return;
      } else {
         updatedData.contact = contact
      }

      if (validateField(phone, 'O telefone é obrigatório!')) {
         return;
      } else {
         updatedData.phone = phone
      }

      if (validateField(email, 'O e-mail é obrigatório!')) {
         return;
      } else {
         updatedData.email = email
      }

      if (validateField(sector, 'O setor é obrigatório!')) {
         return;
      } else {
         updatedData.sector = sector
      }

      if (validateField(company, 'O nome da empresa é obrigatório!')) {
         return;
      } else {
         updatedData.company = company
      }

      if (validateField(businessLine, 'O ramo de atuação é obrigatório!')) {
         return;
      } else {
         updatedData.businessLine = businessLine
      }

      if (validateField(cep, 'O cep é obrigatório!')) {
         return;
      } else {
         updatedData.cep = cep
      }

      if (validateField(address, 'O endereço é obrigatório!')) {
         return;
      } else {
         updatedData.address = address
      }

      if (validateField(addressNumber, 'O número do endereço é obrigatório!')) {
         return;
      } else {
         updatedData.addressNumber = addressNumber
      }

      if (validateField(city, 'A cidade é obrigatória!')) {
         return;
      } else {
         updatedData.city = city
      }

      if (validateField(state, 'O estado é obrigatório!')) {
         return;
      } else {
         updatedData.state = state
      }

      await Provider.findByIdAndUpdate(id, updatedData)

      res.status(200).json({ message: 'Fornecedor atualizado com sucesso!' })
   }
}