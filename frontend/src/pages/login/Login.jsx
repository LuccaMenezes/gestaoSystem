import { useState, useContext } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom';

import { Context } from '../../context/UserContext'

const login = () => {

  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user);
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }
  const paperStyle = { padding: '30px 30px', width: 350, margin: '20px auto', borderRadius: '10px' }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>

            </Avatar>
            <h2 style={headerStyle}>Login</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label='Email' name="email" variant="standard" onChange={handleChange} />
            <TextField fullWidth label='Senha' name="password" variant="standard" onChange={handleChange} />
            <Button type='submit' variant='contained' color='primary'>Cadastrar</Button>
          </form>
          <Typography align='center'>
            Não tem conta? <Link to="/register">Clique Aqui</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  )
}

export default login