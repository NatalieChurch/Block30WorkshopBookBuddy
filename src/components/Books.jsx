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

    console.log(books)

   return (
    <div>
        {   books &&
            books.map((books) =>
                <div key={books.id} id="allBookDisplay">
                    <h1>{books.title}</h1>
                    <h2>{books.author}</h2>
                    <img style={{height:"300px"}} src={books.coverimage} alt={`${books.title} cover`} />
                    <button onClick={()=>navigate(`/books/${books.id}`)}>See Book Details</button>

                </div>
            )
        }
    </div>
   )

}

export default Books