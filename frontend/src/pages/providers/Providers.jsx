import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import CreateProvider from '../../components/createProvider/CreateProvider'

import Box from '@mui/material/Box';

const Providers = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px'}}>
          <h1>Fornecedores</h1>
          <CreateProvider />
        </Box>
      </Box>
      
    </>
    
  )
}

export default Providers