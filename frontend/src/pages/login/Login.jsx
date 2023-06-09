import { useState, useContext } from 'react'
import { Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom';

import Logo from '../../assets/img/SimpleLogo.png'

import { Context } from '../../context/UserContext'

const Login = () => {
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
    top: '110px',
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
    flexDirection: 'column'
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
            <TextField fullWidth label='Email' name="email" variant="standard" onChange={handleChange} />
            <TextField fullWidth label='Senha' name="password" variant="standard" onChange={handleChange} />
            <Button type='submit' variant='contained' style={buttonStyle}>Login</Button>
          </form>
          <Typography align='center' style={{marginTop: '20px'}}>
            Não tem conta? <Link to="/register">Clique aqui</Link>
          </Typography>
        </Paper>
      </div>
    </div>
  )
}

export default Login
