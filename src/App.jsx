import './App.css'
import Signup from './Signup'
import Login from './Login'
import { Router,Routes,Route } from 'react-router-dom'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Signup />} />      {/* Default route for Signup */}
        <Route path="/login" element={<Login />} />  {/* Route for Login */}
      </Routes>
  )
}

export default App
