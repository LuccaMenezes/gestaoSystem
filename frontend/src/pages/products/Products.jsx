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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import api from '../../utils/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f6c71e',
    },
  },
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const { setFlashMessage } = useFlashMessage();
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(products.length / perPage);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data.product);
    });
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  const tableContainerStyle = {
    margin: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    width: '1200px',
  };


  const tableRowStyle = {
    backgroundColor: 'lightyellow',
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const offset = currentPage * perPage;
  const currentProducts = products.slice(offset, offset + perPage);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginTop: '0px', marginLeft: '60px' }}
        >
          <Sidebar />
          <CreateProduct />

          <TableContainer component={Paper} style={tableContainerStyle}>
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
                  <TableCell>Situação</TableCell> {/* Adicionada a coluna Situação */}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProducts.map((product, index) => {
                  let situacaoColor = '';
                  let situacaoText = '';

                  if (product.unit < product.minimumStock) {
                    situacaoColor = 'red';
                    situacaoText = 'Em falta';
                  } else if (product.unit === product.minimumStock) {
                    situacaoColor = 'yellow';
                    situacaoText = 'Estoque baixo';
                  } else {
                    situacaoColor = 'green';
                    situacaoText = 'OK';
                  }

                  return (
                    <TableRow
                      key={product.code}
                      style={index % 2 === 1 ? {} : { backgroundColor: 'lightyellow' }}
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
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              backgroundColor: situacaoColor,
                              marginRight: '5px',
                            }}
                          ></div>
                          {situacaoText}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={paginationStyle}>
            <ThemeProvider theme={theme}>
              <Stack spacing={2}>
                <Pagination
                  count={pageCount}
                  page={currentPage + 1}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Stack>
            </ThemeProvider>
          </div>
        </Box>  
      </Box>
    </>
  );
};

export default Products;
