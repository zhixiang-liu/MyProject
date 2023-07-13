import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/index'
import Login from './pages/login'
import Register from './pages/register'
import React, { useState } from 'react'
// import Aaa from './pages/aaa'
function App() {
  const [account, setAccount] = useState('')
  console.log('app', account)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/index" element={<Index account={account} />}></Route>
          {/* <Route path="/aaa" element={<Aaa />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
