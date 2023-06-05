import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { useState, useContext } from 'react'

import { Context } from '../../context/UserContext'


function Register() {

   const [user, setUser] = useState({})
   const {register} = useContext(Context) 

   function handleChange(e) {
      setUser({ ...user, [e.target.name]: e.target.value})
      console.log('a ' + setUser);
   }

   function handleSubmit (e) {
      e.preventDefault()
      register(user)
   }

   const paperStyle={padding:'30px 30px', width:350, margin:'20px auto', borderRadius:'10px' }
   const headerStyle={margin: 0}
   const avatarStyle={backgroundColor: '#1bbd7e'}

   return (
      <Grid>
         <Paper elevation={20} style={paperStyle}>
           <Grid align='center'>
             <Avatar style={avatarStyle}>
               
             </Avatar>
             <h2 style={headerStyle}>Cadastre-se</h2>
           </Grid>
           <form onSubmit={handleSubmit}>
               <TextField fullWidth label='Name' name="name" variant="standard" onChange={handleChange}/>
               <TextField fullWidth label='Email' name="email" variant="standard" onChange={handleChange}/>
               <TextField fullWidth label='Senha' name="password" variant="standard" onChange={handleChange}/>
               <TextField fullWidth label='Confirme sua senha' name="confirmpassword" variant="standard" onChange={handleChange}/>
               <TextField fullWidth label='Telefone' name="phone" variant="standard" onChange={handleChange}/>
               <TextField fullWidth label='Empresa' name="company" variant="standard" onChange={handleChange}/>
               <Button type='submit' variant='contained' color='primary'>Cadastrar</Button>
           </form>
         </Paper>
      </Grid>
   )
}

export default Register