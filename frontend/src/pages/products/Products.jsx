import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import CreateProduct from '../../components/createProduct/CreateProduct';

import useFlashMessage from '../../hooks/useFlashMessage';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import api from '../../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data.product);
    });
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginTop: '64px', marginLeft: '60px' }}
        >
          <Sidebar />
          <Typography variant="h1" component="h1" mb={3}>
            Produtos
          </Typography>
          <CreateProduct />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Unidade</TableCell>
                  <TableCell>Estoque Mínimo</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Subcategoria</TableCell>
                  <TableCell>Fornecedor</TableCell>
                  <TableCell>Preço de Custo</TableCell>
                  <TableCell>Preço de Venda</TableCell>
                  <TableCell>Margem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={product.code}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'lightyellow' : 'white',
                    }}
                  >
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>{product.minimumStock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.subcategory}</TableCell>
                    <TableCell>{product.provider}</TableCell>
                    <TableCell>{product.purchasePrice}</TableCell>
                    <TableCell>{product.salePrice}</TableCell>
                    <TableCell>{product.margin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Products;
