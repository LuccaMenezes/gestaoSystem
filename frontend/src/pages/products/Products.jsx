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
import TextField from '@mui/material/TextField';
import { FormControl, Select, MenuItem, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


import api from '../../utils/api';

import EditProductModal from '../../components/editProductModal/EditProductModal'; // Importação do novo componente de modal

const theme = createTheme({
  palette: {
    primary: {
      main: '#f6c71e',
    },
  },
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
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

  const handleSearch = () => {
    // Perform search logic based on searchTerm and selectedColumn
    // Update the products state with the filtered results
    const filteredProducts = products.filter((product) => {
      if (selectedColumn === 'code' || selectedColumn === 'minimumStock') {
        return product[selectedColumn] === Number(searchTerm);
      } else if (
        selectedColumn === 'unit' ||
        selectedColumn === 'purchasePrice' ||
        selectedColumn === 'salePrice' ||
        selectedColumn === 'margin'
      ) {
        return product[selectedColumn].toString().includes(searchTerm);
      } else {
        return product[selectedColumn]
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    });

    setProducts(filteredProducts);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setSelectedColumn('');
    // Reset products to original state
    api.get('/products').then((response) => {
      setProducts(response.data.product);
    });
  };

  const tableContainerStyle = {
    margin: '20px auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    width: '1200px',
  };

  const tableHeaderCellStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#f6c71e',
  };

  const tableCellCenterStyle = {
    textAlign: 'center',
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const offset = currentPage * perPage;
  const currentProducts = products.slice(offset, offset + perPage);

  async function removeProduct(id) {
    let msgType = 'success';

    const data = await api
      .delete(`products/${id}`, products)
      .then((response) => {
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
        return response.data;
      })
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  const [editingProduct, setEditingProduct] = useState(null); // Estado para o produto em edição

  const openEditModal = (product) => {
    setEditingProduct(product); // Define o produto a ser editado
  };

  const closeEditModal = () => {
    setEditingProduct(null); // Limpa o estado de edição
  };

  const saveEditedProduct = async (id, editedProduct) => {
    let msgType = 'success';
  
    const data = await api
      .patch(`products/${id}`, editedProduct)
      .then((response) => {
        const updatedProducts = products.map((product) => {
          if (product._id === editedProduct.id) {
            return response.data.product;
          }
          return product;
        });
        setProducts(updatedProducts);
        setFlashMessage(response.data.message, 'success');
        closeEditModal();
      })
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      });
  
    setFlashMessage(data.message, msgType);
  };
  
  
    // setFlashMessage(data.message, msgType);
    // api
    //   .put(`/products/${editedProduct.id}`, editedProduct)
    //   .then((response) => {
      //   const updatedProducts = products.map((product) => {
      //     if (product._id === editedProduct.id) {
      //       return response.data.product;
      //     }
      //     return product;
      //   });
      //   setProducts(updatedProducts);
      //   setFlashMessage(response.data.message, 'success');
      //   closeEditModal();
      // })
    //   .catch((error) => {
    //     setFlashMessage(error.response.data.message, 'error');
    //   });

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '0px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <FormControl sx={{ marginRight: '10px' }}>
              <Select
                value={selectedColumn}
                onChange={(event) => setSelectedColumn(event.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Select column' }}
                style={{ marginTop: '70px', marginLeft: '93px' }}
              >
                <MenuItem value="" disabled>
                  Coluna
                </MenuItem>
                <MenuItem value="code">Código</MenuItem>
                <MenuItem value="description">Descrição</MenuItem>
                <MenuItem value="unit">Unidades</MenuItem>
                <MenuItem value="minimumStock">Estoque Mínimo</MenuItem>
                <MenuItem value="category">Categoria</MenuItem>
                <MenuItem value="subcategory">Subcategoria</MenuItem>
                <MenuItem value="provider">Fornecedor</MenuItem>
                <MenuItem value="purchasePrice">Preço de Compra</MenuItem>
                <MenuItem value="salePrice">Preço de Venda</MenuItem>
                <MenuItem value="margin"></MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Filtrar"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ marginRight: '10px', marginTop: '70px' }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                marginRight: '10px',
                marginTop: '70px',
                backgroundColor: '#f6c71e',
              }}
            >
              Filtrar
            </Button>
            <Button
              variant="contained"
              onClick={resetSearch}
              sx={{
                marginRight: '10px',
                marginTop: '70px',
                backgroundColor: '#f6c71e',
              }}
            >
              Limpar
            </Button>
            <div style={{ position: 'absolute', top: '103px', left: '1335px' }}>
              <CreateProduct />
            </div>
          </Box>

          <TableContainer component={Paper} style={tableContainerStyle}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={tableHeaderCellStyle}>Código</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Descrição</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Unidades</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Estoque Mínimo</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Categoria</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Subcategoria</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Fornecedor</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Preço de Compra</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Preço de Venda</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Margem</TableCell>
                  <TableCell style={{  ...tableHeaderCellStyle, textAlign: 'center', width: '137px' }}>
                    Situação
                  </TableCell>
                  <TableCell style={tableHeaderCellStyle}>Ações</TableCell>
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
                      style={index % 2 === 1 ? {} : { backgroundColor: '#f6f6f6' }}
                    >
                      <TableCell style={tableCellCenterStyle}>{product.code}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.description}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.unit}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.minimumStock}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.category}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.subcategory}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.provider}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.purchasePrice}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.salePrice}</TableCell>
                      <TableCell style={tableCellCenterStyle}>{product.margin}</TableCell>
                      <TableCell style={{...tableCellCenterStyle, textAlign: 'center' }}>
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
                      <TableCell>
                        <IconButton aria-label="edit" size="small" onClick={() => openEditModal(product)}>
                          <EditIcon />
                        </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          removeProduct(product._id)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <ThemeProvider theme={theme}>
            <Stack sx={paginationStyle}>
              <Pagination
                count={pageCount}
                page={currentPage + 1}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </ThemeProvider>
        </Box>
      </Box>
      {editingProduct && ( // Renderiza o modal de edição se houver um produto em edição
        <EditProductModal
          open={Boolean(editingProduct)}
          product={editingProduct}
          onSave={(editedProduct) => saveEditedProduct(editingProduct._id, editedProduct)}
          onClose={closeEditModal}
        />
      )}
    </>
  );
};

export default Products;
