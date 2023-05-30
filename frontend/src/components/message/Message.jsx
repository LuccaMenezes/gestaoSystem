import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import bus from '../../utils/bus'

import styles from './Message.module.css'

function Message() {
   const [visibility, setVisibility] = useState(false)
   const [type, setType] = useState("")
   const [message, setMessage] = useState("")

   useEffect(() => {

      bus.addListener('flash', ({message, type}) => {

         setVisibility(true)
         setMessage(message)
         setType(type)

         setTimeout(() => {
            setVisibility(false)
         }, 3000)

      })

   })

   return (
      visibility && (
         <Stack sx={{ width: '100%'}} spacing={2}>
            <Alert variant="filled" severity={type}>{message}</Alert>
         </Stack>
      )
      
   )
}

export default Message