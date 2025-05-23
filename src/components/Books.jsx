import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchAllBooks } from "../API/API";

function Books () {

    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {
        const apiCall = async () => {
            const res = await fetchAllBooks()
            setBooks(res)
            setFilteredResults(res);
        }
        apiCall();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredResults([]);
        } else {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(lowerSearch)
        );
        setFilteredResults(filtered);
        }
    }, [searchTerm, books]);

   return (
    <div style={{paddingBottom: "100px"}}>
        <div className="searchBar">
            <h1>Search for a Book</h1>
            <input
                id = "searchInput"
                type = "text"
                placeholder = "Enter search term"
                value = {searchTerm}
                onChange = {e => setSearchTerm(e.target.value)}
            />
            <div id="searchResults">
                {filteredResults.map(book => (
                    <h3 key={book.id}>{book.title}</h3>
                ))}
            </div>
        </div>
        {   books &&
            books.map((books) =>
                <div key={books.id} id="allBookDisplay">
                    <h1>{books.title}</h1>
                    <h2>{books.author}</h2>
                    <img className="imgClass" style={{height:"300px"}} src={books.coverimage} alt={`${books.title} cover`} />
                    <button onClick={()=>navigate(`/books/${books.id}`)}>See Book Details</button>

                </div>
            )
        }
    </div>
   )

}

export default Books