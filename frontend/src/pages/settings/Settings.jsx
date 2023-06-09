import api from '../../utils/api'
import useFlashMessage from '../../hooks/useFlashMessage';

import { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import { TextField, Button, Box, Container, Grid, Paper, List, ListItemText, ListItem, Avatar } from '@mui/material'


const Settings = () => {

  const [user, setUser] = useState({});

  const [token] = useState(localStorage.getItem('token') || '');

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    if (token) {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      });
    }
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(user).forEach((key) =>
      formData.append(key, user[key])
    )

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType);
  }

  const paperStyle = {
    padding: '60px 30px',
    width: 350,
    margin: '20px auto',
    borderRadius: '10px'
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
  const avatarStyle = {
    width: '90px',
    height: '90px',
    padding: '5px',
      position: 'absolute',
      top: '90px',
      left: '53.5%',
      transform: 'translateX(-50%)',
    backgroundColor: '#f6c71e'
  }
  return (

    <div style={containerStyle}>
      <Sidebar />
      <div>
        <Avatar style={avatarStyle}/>
        <Paper elevation={20} style={paperStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <TextField fullWidth label='Nome' name="name" variant="standard" onChange={handleChange} value={user.name || ''}  />
            <TextField fullWidth label='Email' name="email" variant="standard" onChange={handleChange} value={user.email || ''} style={{ marginTop: '10px' }} />
            <TextField fullWidth label='Telefone' name="phone" variant="standard" onChange={handleChange} value={user.phone || ''} style={{ marginTop: '10px' }} />
            <TextField fullWidth label='Empresa' name="company" variant="standard" onChange={handleChange} value={user.company || ''} style={{ marginTop: '10px' }} />
            <Button type='submit' variant='contained' style={buttonStyle}>Atualizar</Button>
          </form>
        </Paper>
      </div>
    </div>
    // <Grid>
    //   <Sidebar />
    //      <Paper elevation={20} style={paperStyle}>
    //        <Grid align='center'>
    //          <Avatar style={avatarStyle}>

    //          </Avatar>
    //          <h2 style={headerStyle}>Perfil</h2>
    //        </Grid>
    //             <form onSubmit={handleSubmit}>
    //               <TextField fullWidth label='Nome' name="name" variant="standard" onChange={handleChange} value={user.name || ''} />
    //               <TextField fullWidth label='Email' name="email" variant="standard" onChange={handleChange} value={user.email || ''} />
    //               <TextField fullWidth label='Telefone' name="phone" variant="standard" onChange={handleChange} value={user.phone || ''} />
    //               <TextField fullWidth label='Empresa' name="company" variant="standard" onChange={handleChange} value={user.company || ''} />
    //               <Button type='submit' variant='contained' color='primary'>Atualizar</Button>
    //               </form>
    //      </Paper>
    //   </Grid>
  )
}

export default Settings
