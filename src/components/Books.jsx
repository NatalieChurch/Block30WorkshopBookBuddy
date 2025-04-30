/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchAllBooks } from "../API/API";

function Books ({setReservedBook, setCheckoutBook, token}) {

    const [books, setBooks] = useState([])
    const navigate = useNavigate();

    useEffect (() => {
        const apiCall = async () => {
            const res = await fetchAllBooks()
            setBooks(res)
        }
        apiCall();
    }, []);

    const handleCheckout = (books) => {
        if (!token) return (<p>Please log in to check out a book!</p>)
        setCheckoutBook(books.id);
    }

    const handleReserve = (books) => {
        if (!token) return (<p>Please log in to reserve a book!</p>)
        setReservedBook(books.id);
    }

    console.log(books)

   return (
    <div>
        {   books &&
            books.map((books) =>
                <div key={books.id} id="allBookDisplay">
                    <h1>{books.title}</h1>
                    <h2>{books.author}</h2>
                    <img src={books.coverimage} />

                    <button onClick={()=>handleCheckout(books.id)}>Check out this Book</button>
                    <button onClick={()=>handleReserve(books.id)}>Reserve this Book</button>
                        {/* Make two buttons above functional, and ensure below button redirects properly */}
                    <button onClick={()=>navigate(`/books/${books.id}`)}>See Book Details</button>

                </div>
            )
        }
    </div>
   )

}

export default Books