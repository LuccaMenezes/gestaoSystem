import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import Box from '@mui/material/Box';
const Entry = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px'}}>
          <h1>Entradas</h1>
        </Box>
      </Box>     
    </>
  )
}

export default Entry