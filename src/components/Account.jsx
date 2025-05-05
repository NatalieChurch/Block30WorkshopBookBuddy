import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Account () {
    
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const token = localStorage.getItem("token");
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else {
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
    }
    }, [token, navigate]);

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

  const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("password");

            navigate("/");

            window.location.reload();
        };

    return (
        <div style={{paddingBottom: "100px"}}>
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
                                <img className="imgClass" style={{ height: "100px" }} src={book.coverimage} alt={book.title} />
                                <button onClick={() => handleReturn(book.id)}>Return this Book</button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <button onClick={handleLogout}>Logout</button>

        </div>
    );
}

export default Account;
