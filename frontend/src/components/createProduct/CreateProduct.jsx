import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SelectProvider from '../../components/select/Select';
import useFlashMessage from '../../hooks/useFlashMessage';
import api from '../../utils/api';

const CreateProduct = () => {

   const [product, setProduct] = useState({});
   const [open, setOpen] = useState(false);
   const [profitMargin, setProfitMargin] = useState('');

   const handleClickOpen = () => {
      setOpen(true);
      setProduct({}); // Limpa os campos do produto quando o modal é aberto
   };

   const handleClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      const calculateProfitMargin = () => {
         const purchasePrice = parseFloat(product.purchasePrice) || 1;
         const salePrice = parseFloat(product.salePrice) || 1;

         const profit = salePrice - purchasePrice;
         const profitMargin = ((profit / purchasePrice) * 100).toFixed(2) + '%';

         setProfitMargin(profitMargin);
      };

      calculateProfitMargin();
   }, [product]);

   const handleChange = (e) => {
      setProduct({ ...product, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      let msgType = 'success';

      const { setFlashMessage } = useFlashMessage();

      const data = await api
         .post('products/register', product)
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
            Adicionar Produto
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cadastrar Produto</DialogTitle>
            <DialogContent style={{ padding: '10px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={4}>
                     <TextField
                        label="Código"
                        fullWidth
                        name="code"
                        onChange={handleChange}
                        value={product.code}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="end">
                                 <IconButton>
                                    <AddIcon />
                                 </IconButton>
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Descrição do Produto"
                        name="description"
                        onChange={handleChange}
                        value={product.description || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Unidades"
                        name="unit"
                        onChange={handleChange}
                        value={product.unit || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Estoque Mínimo"
                        name="minimumStock"
                        onChange={handleChange}
                        value={product.minimumStock || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Categoria"
                        name="category"
                        onChange={handleChange}
                        value={product.category || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Subcategoria"
                        name="subcategory"
                        onChange={handleChange}
                        value={product.subcategory || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Preço de Custo"
                        name="purchasePrice"
                        onChange={handleChange}
                        value={product.purchasePrice || ''}
                        type="number"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Preço de venda"
                        name="salePrice"
                        onChange={handleChange}
                        value={product.salePrice || ''}
                        type="number"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Margem de Lucro"
                        value={product.margin || profitMargin}
                        onChange={handleChange}
                        name="margin"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <SelectProvider value={product.provider || ''} onChange={handleChange} name="provider" />
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancelar</Button>
               <Button onClick={handleSubmit}>Salvar</Button>
            </DialogActions>
         </Dialog>
      </>
   )
}

export default CreateProduct