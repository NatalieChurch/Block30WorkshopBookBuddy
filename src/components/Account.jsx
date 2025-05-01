// /* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from 'react';

function Account () {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const token = localStorage.getItem("token");
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setUserInfo(data);

            } catch (err) {
                console.error(err);
            }
        };
        fetchUserInfo();
    }, []);

    const handleReturn = async (bookId) => {
        try {
            const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const updatedUserInfo = { ...userInfo };
            updatedUserInfo.reservations = updatedUserInfo.reservations.filter((book) => book.id !== bookId);
            setUserInfo(updatedUserInfo);

        } catch (err) {
            console.error(err);
            alert("Cannot return this book. Please talk to a librarian.");
        }
    };

    return (
        <div>
            <h1> Welcome to Your Account Page! </h1>
            <h2>Your Account Details:</h2>
            <h3>Email: {email}</h3>
            <h3>Password: {password}</h3>

            {userInfo && (
                <>
                    <h2>You have checked out or reserved:</h2>
                    <div>
                        {userInfo.reservations?.map(book => (
                            <div key={book.id}>
                                <h3>{book.title}</h3>
                                <h3>{book.author}</h3>
                                <img style={{ height: "100px" }} src={book.coverimage} alt={book.title} />
                                <button onClick={() => handleReturn(book.id)}>Return this Book</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Account;
