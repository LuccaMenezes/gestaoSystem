import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { useState, useContext } from 'react'

import Logo from '../../assets/img/SimpleLogo.png'

import { Context } from '../../context/UserContext'


function Register() {

   const [user, setUser] = useState({})
   const { register } = useContext(Context)

   function handleChange(e) {
      setUser({ ...user, [e.target.name]: e.target.value })
      console.log('a ' + setUser);
   }

   function handleSubmit(e) {
      e.preventDefault()
      register(user)
   }

   const paperStyle = {
      padding: '60px 30px',
      width: 350,
      margin: '20px auto',
      borderRadius: '10px'
   }

   const logoStyle = {
      width: '100px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
      left: '50%',
      transform: 'translateX(-50%)'
   }

   const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(90deg, rgba(230,230,230,1) 0%, rgba(255,255,255,1) 100%)'
   }

   const formStyle = {
      display: 'flex',
      flexDirection: 'column',
   }

   const buttonStyle = {
      marginTop: '20px',
      background: '#f6c71e'
   }

   return (

      <div style={containerStyle}>
         <div>
            <img src={Logo} alt="Gestão System" style={logoStyle} />
            <Paper elevation={20} style={paperStyle}>
               <form onSubmit={handleSubmit} style={formStyle}>
                  <TextField fullWidth label='Nome' name="name" variant="standard" onChange={handleChange} />
                  <TextField fullWidth label='Email' name="email" variant="standard" onChange={handleChange} style={{ marginTop: '10px' }} />
                  <TextField fullWidth label='Senha' name="password" variant="standard" onChange={handleChange} style={{ marginTop: '10px' }} />
                  <TextField fullWidth label='Confirme sua senha' name="confirmpassword" variant="standard" onChange={handleChange} style={{ marginTop: '10px' }} />
                  <TextField fullWidth label='Telefone' name="phone" variant="standard" onChange={handleChange} style={{ marginTop: '10px' }} />
                  <TextField fullWidth label='Empresa' name="company" variant="standard" onChange={handleChange} style={{ marginTop: '10px' }} />
                  <Button type='submit' variant='contained' style={buttonStyle}>Cadastrar</Button>
               </form>
            </Paper>
         </div>
      </div>
   )
}

export default Register