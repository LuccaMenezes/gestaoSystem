import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import Box from '@mui/material/Box';

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>testeeee</h1>
        </Box>
      </Box>
      
    </>
    
  )
}

export default Home