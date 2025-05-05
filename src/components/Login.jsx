import { useState } from "react";

function Login({ setToken }) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token")

  async function handleLogin(event) {
    event.preventDefault();
    setError(null);


    try {
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email:username, password })
      });

      const result = await response.json();

      setToken(result.token);
      setUsername("");
      setPassword("");
    
    } catch (error) {
      setError(error.message);
    } 
  }

  return (
    <div style={{paddingBottom: "100px"}}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            id="login-email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" id="loginButton">Submit!</button>
      </form>
    </div>
  );
}

export default Login;
