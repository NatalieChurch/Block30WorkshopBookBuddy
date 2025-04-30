const API = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`

export const fetchAllBooks = async () => {
    try {
      const res = await fetch(`${API}`)
      const data = await res.json()
        
      return(data)
    } catch (err) {
      console.error(`Oh no, trouble fetching books!`, err);
    }
  };