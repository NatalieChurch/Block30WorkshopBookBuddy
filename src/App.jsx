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

  // useEffect(()=> {
  //   const getBooks = async () => {
  //     const res = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
  //     const data = await res.json()
  //     console.log(data)
  //     setBooks(data)
  //   }
  //   getBooks();
  //   console.log("First UseEffect")
  // }, []);

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Book Buddy Library App</h1>

      {/* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p> */}

        <div id="navBar" style={{display:"flex", justifyContent:"space-between"}}>
          <Link to="/"> Home </Link>
          <Link to="/books"> Library Catalogue </Link>
          {!token && <Link to="/users/register"> Register </Link>}
          {!token && <Link to="/users/login"> Log In </Link>}
  {/* Make sure the conditional rendering of the two lines above is correct */}
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
