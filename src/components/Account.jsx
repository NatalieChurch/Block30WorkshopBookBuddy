/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */


function Account () {

const email = localStorage.getItem("email");
const password = localStorage.getItem("password")

    return(

    <div>    
        <h1> Welcome to Your Account Page! </h1>
            <h2>Your Account Details:</h2>
            <h3>Email: {email}</h3>
            <h3>Password: {password}</h3>
    </div>)
}

export default Account