import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import bus from '../../utils/bus'

import styles from './Message.module.css'

function Message() {
   const [visibility, setVisibility] = useState(false)
   const [type, setType] = useState("")
   const [message, setMessage] = useState("")

   useEffect(() => {

      bus.addListener('flash', ({ message, type }) => {

         setVisibility(true)
         setMessage(message)
         setType(type)

         setTimeout(() => {
            setVisibility(false)
         }, 3000)

      })

   })

   const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
   });

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setVisibility(false);
   };

   return (
      visibility && (
         <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={visibility} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
               <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
         </Stack>
      )

   )
}

export default Message