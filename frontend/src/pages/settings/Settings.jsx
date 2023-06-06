import { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SidebarAerea = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
}));




const Settings = () => {

  const [selectedOption, setSelectedOption] = useState('perfil');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderFields = () => {
    if (selectedOption === 'perfil') {
      return (
        <>
          <div>
            <label>Nome:</label>
            <input type="text" />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" />
          </div>

          <div>
            <label>Telefone:</label>
            <input type="tel" />
          </div>
        </>
      );
    } else if (selectedOption === 'empresa') {
      return (
        <>
          <label>CNPJ:</label>
          <input type="text" />

          <label>Razão Social:</label>
          <input type="text" />

          <label>Setor de Atuação:</label>
          <input type="text" />
        </>
      );
    }

    return null;
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
          <Container maxWidth="lg" sx={{ marginTop: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <SidebarAerea>
                  <List>
                    <ListItem button selected={selectedOption === 'perfil'} onClick={() => handleOptionSelect('perfil')}>
                      <ListItemText primary="Perfil" />
                    </ListItem>
                    <ListItem button selected={selectedOption === 'empresa'} onClick={() => handleOptionSelect('empresa')}>
                      <ListItemText primary="Empresa" />
                    </ListItem>
                  </List>
                </SidebarAerea>
              </Grid>
              <Grid item xs={9}>
                <Paper sx={{ padding: 2 }}>
                  {renderFields()}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Settings