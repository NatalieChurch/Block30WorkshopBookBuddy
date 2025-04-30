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

    const handleCheckout = (bookId) => {
        console.log("Checkout clicked for this book");
    };

    const handleReserve = (bookId) => {
        console.log("Reserve clicked for this book");
    };

    return (
        <div>
            {book && (
                    <div key={book.id} id="singleBookDisplay">
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <img src={book.coverimage} alt={book.title}/>
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