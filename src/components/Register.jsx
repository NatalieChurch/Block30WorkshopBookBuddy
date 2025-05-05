/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Register ({setToken}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
            {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: username,
                    password: password
                })
            })

            const result = await response.json()
            console.log(result);
            setToken(result.token);

            localStorage.setItem("email", username);
            localStorage.setItem("password", password);
            localStorage.setItem("token", result.token);

            setUsername("");
            setPassword("");

            navigate("/");
            window.location.reload();
            alert("Congrats, you've registered!");

    } catch (error){
        setError(error.message)
    }
}

return(
    <div style={{paddingBottom: "100px"}}>
        <h2>Register Now!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                <input id="email" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter email"/>
            </label>
            <label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <button>Submit!</button>
        </form>
    </div>);
    
}

export default Register