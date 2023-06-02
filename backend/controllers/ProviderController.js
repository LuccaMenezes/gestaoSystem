const Provider = require('../models/Provider');

module.exports = class ProviderController {
   static async register(req, res) {
      const { company, cnpj, contact, sector, businessLine, phone, email, cep, city, state, address, addressNumber} = req.body

      // validations
      if (!cnpj) {
         res.status(422).json({ message: 'O cnpj é obrigatório!' });
         return
      }

      if (!contact) {
         res.status(422).json({ message: 'O nome do contato é obrigatório!' });
         return
      }

      if (!phone) {
         res.status(422).json({ message: 'O telefone é obrigatório!' });
         return
      }

      if (!email) {
         res.status(422).json({ message: 'O e-mail é obrigatório!' });
         return
      }

      if (!sector) {
         res.status(422).json({ message: 'O setor é obrigatório!' });
         return
      }

      if (!company) {
         res.status(422).json({ message: 'O nome da empresa é obrigatório!' });
         return
      }

      if (!businessLine) {
         res.status(422).json({ message: 'O ramo de atuação é obrigatório!' });
         return
      }

      if (!cep) {
         res.status(422).json({ message: 'O cep é obrigatório!' });
         return
      }

      if (!address) {
         res.status(422).json({ message: 'O endereço é obrigatório!' });
         return
      }

      if (!addressNumber) {
         res.status(422).json({ message: 'O número do endereço é obrigatório!' });
         return
      }
   
      if (!city) {
         res.status(422).json({ message: 'A cidade é obrigatória!' });
         return
      }

      if (!state) {
         res.status(422).json({ message: 'O estado é obrigatório!' });
         return
      }

       // check if provider exists
       const ProviderExists = await Provider.findOne({ cnpj: cnpj })

       if (ProviderExists) {
          res.status(422).json({ message: `Fornecedor com o cnpj:${cnpj} já cadastrado!` });
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
        res.status(200).json({ message: 'Fornecedor cadastrado com sucesso!'})

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }
}