import bookLogo from './assets/books.png'
import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'



function App() {
  const [token, setToken] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Book Buddy Library App</h1>

        <div id="navBar" style={{display:"flex", justifyContent:"space-between", padding: "10%"}}>
          <Link to="/"> Home </Link>
          <Link to="/books"> Library Catalogue </Link>
          {!token && <Link to="/users/register"> Register </Link>}
          {!token && <Link to="/users/login"> Log In </Link>}

          {token? <Link to="/users/me"> Account </Link> : null}
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/books" element={<Books/>} />
            <Route path="/books/:id" element={<SingleBook/>} />
            <Route path="/users/register" element={<Register token={token} setToken={setToken}/>} />
            <Route path="users/login" element={<Login token={token} setToken={setToken} />} />
            <Route path="users/me" element={<Account/>} />
          </Routes>
        </div>
    </>
  )
}

export default App
