import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  DialogContent,
  Grid,
  InputAdornment ,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import SelectProvider from '../../components/select/Select';

const EditProductModal = ({ open, product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    onSave(editedProduct);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
        }}
      >
        <Typography variant="h5" mb={2}>
          Editar Produto
        </Typography>
        <DialogContent style={{ padding: '10px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={4}>
                     <TextField
                        label="Código"
                        fullWidth
                        name="code"
                        onChange={handleChange}
                        value={editedProduct.code}
                        
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Descrição do Produto"
                        name="description"
                        onChange={handleChange}
                        value={editedProduct.description || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Unidades"
                        name="unit"
                        onChange={handleChange}
                        value={editedProduct.unit || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Estoque Mínimo"
                        name="minimumStock"
                        onChange={handleChange}
                        value={editedProduct.minimumStock || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Categoria"
                        name="category"
                        onChange={handleChange}
                        value={editedProduct.category || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Subcategoria"
                        name="subcategory"
                        onChange={handleChange}
                        value={editedProduct.subcategory || ''}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Preço de Custo"
                        name="purchasePrice"
                        onChange={handleChange}
                        value={editedProduct.purchasePrice || ''}
                        type="number"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Preço de venda"
                        name="salePrice"
                        onChange={handleChange}
                        value={editedProduct.salePrice || ''}
                        type="number"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label="Margem de Lucro"
                        value={product.margin || ''}
                        onChange={handleChange}
                        name="margin"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <SelectProvider value={editedProduct.provider || ''} onChange={handleChange} name="provider" />
                  </Grid>
               </Grid>
            </DialogContent>
        {/* Adicione aqui os campos restantes, como categoria, subcategoria, fornecedor, etc. */}
        <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
          Salvar
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
