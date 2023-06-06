import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import Box from '@mui/material/Box';

const Withdraw = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
          <h1>Saídas</h1>
        </Box>
      </Box>
    </>
  )
}

export default Withdraw