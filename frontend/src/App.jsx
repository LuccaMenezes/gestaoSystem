import './App.css'

import { Outlet } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Sidebar from './components/sidebar/Sidebar'

import Message from './components/message/Message'

function App() {

  return (
    <>
    
      <h1>teste</h1>
      <UserProvider>
        <Message />
        <Outlet />
      </UserProvider>
    </>
  )
}

export default App
