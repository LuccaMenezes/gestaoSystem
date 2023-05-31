import React from 'react'
import styles from './Input.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function Input({ type, text, name, placeholder, handleOnChange, value, multiple }) {
   return (
      <Box
         component="form"
         sx={{
            '& > :not(style)': { m: 1, width: '35ch' },
         }}
         noValidate
         autoComplete="off"
      >
         <TextField
            id={name}
            label={text}
            variant="outlined"
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            {...(multiple ? { multiple } : '')} />
      </Box>
   )
}

export default Input