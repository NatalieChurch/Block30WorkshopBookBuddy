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
                setBook(data);
            } catch (err) {
                console.error(err)
            }
        };
            getBook();
    }, [id]);

    const handleCheckout = async (bookId) => {

        if (!book.available) {
            alert ("Book is checked out. You or someone else has reserved it.");
            return;
        }
        try {
            const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookId
                })
            });

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

    return (
        <div style={{paddingBottom: "100px"}}>
            {book && (
                    <div key={book.id} id="singleBookDisplay" >
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <img  className="imgClass" style={{height:"400px"}} src={book.coverimage} alt={book.title}/>
                        <h3>{book.description}</h3>
                        <h3>{book.available? "Available" : "Checked Out"}</h3>
                

                {token && (
                    <>
                        <button onClick={()=>handleCheckout(book.id)}>Check out or Reserve this Book</button>
                    </>
                        )}

                        <button onClick={()=>navigate(`/books`)}>Go Back</button>
    
                    </div>
            )}
        </div>
       )

}

export default SingleBook