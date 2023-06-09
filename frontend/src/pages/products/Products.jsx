import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';

const Products = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px'}}>
          <h1>Produtos</h1>
          <Button variant="contained" onClick={handleClickOpen}>
            Adicionar Produto
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastrar Produto</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Código"
                fullWidth
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
              <TextField label="Descrição" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Unidade" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Estoque Mínimo" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Categoria" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Subcategoria" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Fornecedor" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Preço de Custo" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Preço de Venda" fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;
