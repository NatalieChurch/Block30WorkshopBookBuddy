/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchSingleBook } from "../API/APISingleBook"

function SingleBook () {

    const {id} = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getBook = async () => {
            try {
                const data = await fetchSingleBook(id);
                console.log(data);
                setBook(data);
            } catch (err) {
                console.error(err)
            }
        };
            getBook();
    }, [id]);

    const handleCheckout = async (bookId) => {
        console.log("Checkout clicked for this book")
        if (!book.available) {
            alert ("Book is checked out. Please reserve it to read it next!");
            return;
        }
        try {
            const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const responseData = await res.json()
            console.log("API res:", responseData)

            if (!res.ok) throw new Error(responseData.message || "Failed to check out this book.");

        if (book.available) {
            alert ("Successfully checked out the book!");
            return;
        }

            const checkedOut = JSON.parse(localStorage.getItem("checkedOutBooks"));
            const updated = [...checkedOut, { id: book.id, title: book.title, author: book.author }];
            localStorage.setItem("checkedOutBooks", JSON.stringify(updated)); 

            setBook({ ...book, available: false });
        } catch (err) {
            console.error(err);
            alert ("Checkout was not possible.")
        }
    };

    const handleReserve = async (bookId) => {
        console.log("Reserve clicked for this book");
        if (book.available) {
            alert ("You may check out this book rather than reserving it!");
        }
        try {
            const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!book.available) {
                alert ("Successfully reserved this book!");
            }
            
        } catch(err) {
            console.error(err);
            alert ("Reserving was not possible.")
        }
    };

    return (
        <div>
            {book && (
                    <div key={book.id} id="singleBookDisplay">
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <img  style={{height:"400px"}} src={book.coverimage} alt={book.title}/>
                        <h3>{book.description}</h3>
                        <h3>{book.available? "Available" : "Checked Out"}</h3>
                

                {token && (
                    <>
                        <button onClick={()=>handleCheckout(book.id)}>Check out this Book</button>
                        <button onClick={()=>handleReserve(book.id)}>Reserve this Book</button>
                    </>
                        )}
                            {/* Make two buttons above functional, and ensure below button redirects properly */}
                        <button onClick={()=>navigate(`/books`)}>Go Back</button>
    
                    </div>
            )}
        </div>
       )

}

export default SingleBook