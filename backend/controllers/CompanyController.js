const Company = require('../models/Company');
const ObjectId = require('mongoose').Types.ObjectId

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class CompanyController {

   static async register(req, res) {

      const { nameCompany, cnpj, cep, city, state, address, addressNumber, neighborhood } = req.body

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

      if (validateField(nameCompany, 'O nome da empresa é obrigatório!')) {
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

      if (validateField(neighborhood, 'O bairro é obrigatório!')) {
         return;
      }

      if (validateField(city, 'A cidade é obrigatória!')) {
         return;
      }

      if (validateField(state, 'O estado é obrigatório!')) {
         return;
      }

      // check if company exists
      const CompanyExists = await Company.findOne({ cnpj: cnpj })

      if (CompanyExists) {
         res.status(422).json({ message: `Empresa com o cnpj: ${cnpj} já cadastrada!` });
         return
      }

      //get company owner
      const token = getToken(req)
      const user = await getUserByToken(token)
      // create company
      const company = new Company({
         nameCompany,
         cnpj,
         cep,
         city,
         state,
         address,
         addressNumber,
         neighborhood,
         user: {
            _id: user._id,
            name: user.name,
         },
      })

      try {

         const newCompany = await company.save()
         res.status(201).json({
            message: 'Empresa cadastrada com sucesso!',
            newCompany,
         })
      } catch (error) {
         res.status(500).json({ message: error })
      }
      // try {
      //    await company.save();
      //    res.status(200).json({ message: 'Empresa cadastrada com sucesso!' })

      // } catch (error) {
      //    res.status(500).json({ message: error })
      // }
   }

   static async getAll(req, res) {
      const company = await Company.find().sort('-createdAt')
      res.status(200).json({
         company: company,
      })
   }

   static async getCompanyById(req, res) {

      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      //check if company exists
      const company = await Company.findOne({ _id: id })

      if (!company) {
         res.status(404).json({ message: 'Empresa não encontrada!' })
      }

      res.status(200).json({
         company: company,
      })
   }

   static async getUserCompany(req, res) {

      // get user from token
      const token = getToken(req)
      const user = await getUserByToken(token)

      const company = await Company.find({ 'user._id': user._id }).sort('-createdAt')

      res.status(200).json({
         company,
      })
   }

   static async removeCompanyById(req, res) {
      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      //check if company exists
      const company = await Company.findOne({ _id: id })

      if (!company) {
         res.status(404).json({ message: 'Empresa não encontrada!' })
         return
      }

      await Company.findByIdAndRemove(id)
      res.status(200).json({ message: 'Empresa removida com sucesso!' })
   }

   static async updateCompany(req, res) {
      const id = req.params.id

      const { nameCompany, cnpj, cep, city, state, address, addressNumber, neighborhood } = req.body

      const company = await Company.findOne({ _id: id })

      if (!company) {
         res.status(404).json({ message: 'Empresa não encontrada!' })
         return
      }


      if (req.file) {
         company.image = req.file.filename
      }

      const updatedData = {}

      function validateField(value, errorMessage) {
         if (!value) {
            res.status(422).json({ message: errorMessage });
            return true;
         }
         return false;
      }

      // check if company exists

      //validations
      if (validateField(cnpj, 'O cnpj é obrigatório!')) {
         return;
      } else {
         updatedData.cnpj = cnpj
      }

      if (validateField(nameCompany, 'O nome da empresa é obrigatório!')) {
         return;
      } else {
         updatedData.nameCompany = nameCompany
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

      if (validateField(neighborhood, 'O bairro é obrigatório!')) {
         return;
      } else {
         updatedData.neighborhood = neighborhood
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

      await Company.findByIdAndUpdate(id, updatedData)

      res.status(200).json({ message: 'Empresa atualizada com sucesso!' })
   }
}