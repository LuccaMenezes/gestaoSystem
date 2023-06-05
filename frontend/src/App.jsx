import './App.css'

import { Outlet } from 'react-router-dom'
import { UserProvider } from './context/UserContext'

import Message from './components/message/Message'

function App() {

  return (
    <>
      <UserProvider>
        <Message />
        <Outlet />
      </UserProvider>
    </>
  )
}

export default App
