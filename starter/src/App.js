import "./App.css";
import { useState, useEffect } from "react";
import Shelf from "./Shelf";
import { getAll } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [shelves, setShelves] = useState([])

  const getAllBooks = () => {
    let availableShelves = [
      { id: "currentlyReading", title: 'Currently Reading', books: [] },
      { id: "wantToRead", title: 'Want to Read', books: [] },
      { id: "read", title: 'Read', books: [] }]
    getAll().then((allBooks) => {
      allBooks.map((book) => {
        switch (book.shelf) {
          case "currentlyReading":
            availableShelves[0].books.push(book)
            break;
          case "wantToRead":
            availableShelves[1].books.push(book)
            break;
          case 'read':
            availableShelves[2].books.push(book)
            break;
          default:
            break;
        }
      })
      setShelves(()=>[...availableShelves])
    })
  }
  const shelfChangeHandler = (oldShelfId, newShelfId, Book) => {
    if(oldShelfId!==newShelfId&&oldShelfId!=='none'&&newShelfId!=='none'){
      let UpdatedShelves = shelves
      UpdatedShelves.forEach((shelf) => {
        if (shelf.id === oldShelfId)
          shelf.books = shelf.books.filter(book => book.id !== Book.id)
        else if (shelf.id === newShelfId)
        shelf.books.push(Book)
      })
      setShelves(()=>[...UpdatedShelves]) 
    }
  }

  useEffect(() => {
    window.process = {
      ...window.process,
    };
    getAllBooks()
  }, [])

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {shelves.map((shelf, i) => {
                return (
                  <Shelf key={i} shelf={shelf} onShelfChange={shelfChangeHandler} />
                )
              })}
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
