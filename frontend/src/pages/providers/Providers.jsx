import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import CreateProvider from '../../components/createProvider/CreateProvider';

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

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const { setFlashMessage } = useFlashMessage();
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(providers.length / perPage);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data.provider);
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

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const offset = currentPage * perPage;
  const currentProviders = providers.slice(offset, offset + perPage);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginTop: '0px', marginLeft: '60px' }}
        >
          <Sidebar />
          <CreateProvider />

          <TableContainer component={Paper} style={tableContainerStyle}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>CNPJ</TableCell>
                  <TableCell>Nome da Empresa</TableCell>
                  <TableCell>Ramo de Atuação</TableCell>
                  <TableCell>Responsável</TableCell>
                  <TableCell>Setor</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>CEP</TableCell>
                  <TableCell>Endereço</TableCell>
                  <TableCell>Cidade</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {currentProviders.map((provider, index) => {
                  return (
                    <TableRow
                      key={provider.cnpj}
                      style={index % 2 === 1 ? {} : { backgroundColor: 'lightyellow' }}
                    >
                      <TableCell>{provider.cnpj}</TableCell>
                      <TableCell>{provider.company}</TableCell>
                      <TableCell>{provider.businessLine}</TableCell>
                      <TableCell>{provider.contact}</TableCell>
                      <TableCell>{provider.sector}</TableCell>
                      <TableCell>{provider.email}</TableCell>
                      <TableCell>{provider.phone}</TableCell>
                      <TableCell>{provider.cep}</TableCell>
                      <TableCell>{provider.address}, {provider.addressNumber}</TableCell>                      
                      <TableCell>{provider.city}</TableCell>
                      <TableCell>{provider.state}</TableCell>
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
                              marginRight: '5px',
                            }}
                          ></div>
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

export default Providers;
