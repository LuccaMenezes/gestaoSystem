import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useFlashMessage from '../../hooks/useFlashMessage';
import api from '../../utils/api';

const CreateProvider = () => {
   const [provider, setProvider] = useState({});
   const [open, setOpen] = useState(false);
   const [profitMargin, setProfitMargin] = useState('');
   const [cep, setCep] = useState('');

   const handleClickOpen = () => {
      setOpen(true);
      setProvider({}); // Limpa os campos do produto quando o modal é aberto
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleChange = (e) => {
      setProvider({ ...provider, [e.target.name]: e.target.value });
   };

   const fetchAddress = () => {
      if (cep.length === 8) {
         fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
               setProvider({
                  ...provider,
                  cep: cep,
                  address: data.logradouro,
                  city: data.localidade,
                  state: data.uf,
                  addressNumber: '',
               });
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      let msgType = 'success';

      const { setFlashMessage } = useFlashMessage();

      const data = await api
         .post('providers/register', provider)
         .then((response) => {
            return response.data && handleClose();
         })
         .catch((err) => {
            msgType = 'error';
            return err.response.data;
         });

      setFlashMessage(data.message, msgType);
   };

   return (
      <>
         <Button variant="contained" onClick={handleClickOpen}>
            Cadastrar Fornecedor
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cadastrar Fornecedor</DialogTitle>
            <DialogContent style={{ padding: '10px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Nome da Empresa"
                        name="company"
                        onChange={handleChange}
                        value={provider.company || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="CNPJ"
                        name="cnpj"
                        onChange={handleChange}
                        value={provider.cnpj || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Ramo de Atuação"
                        name="businessLine"
                        onChange={handleChange}
                        value={provider.businessLine || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Responsável"
                        name="contact"
                        onChange={handleChange}
                        value={provider.contact || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Setor"
                        name="sector"
                        onChange={handleChange}
                        value={provider.sector || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        onChange={handleChange}
                        value={provider.email || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Telefone"
                        name="phone"
                        onChange={handleChange}
                        value={provider.phone || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="CEP"
                        name="cep"
                        onChange={(e) => {
                           setCep(e.target.value);
                           handleChange(e);
                        }}
                        onBlur={fetchAddress}
                        value={cep || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Cidade"
                        name="city"
                        onChange={handleChange}
                        value={provider.city || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Estado"
                        name="state"
                        onChange={handleChange}
                        value={provider.state || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Endereço"
                        name="address"
                        onChange={handleChange}
                        value={provider.address || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Número"
                        name="addressNumber"
                        onChange={handleChange}
                        value={provider.addressNumber || ''}
                     />
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancelar</Button>
               <Button onClick={handleSubmit}>Salvar</Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default CreateProvider;
