const API = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`

export const fetchSingleBook = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`)
      const data = await res.json()
        
      return(data.data)
    } catch (err) {
      console.error(`Oh no, trouble fetching the book!`, err);
    }
  };