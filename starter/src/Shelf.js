import React from 'react'
import "./App.css";
function Shelf(props) {
  return (
    <div className="bookshelf" >
    <h2 className="bookshelf-title">{props.shelf.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.shelf.books.length===0?<h4>You have no books in this Category</h4>:props.shelf.books.map((book)=>{
            return (
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage:`url(${book.imageLinks.thumbnail})`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select defaultValue='none' onChange={(e)=>props.onShelfChange(props.shelf.id,e.target.value,book)} >
                        <option value="none" disabled  >
                          Move to...
                        </option>
                        <option value="currentlyReading" >
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option> 
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors[0]}</div>
                </div>
              </li>
            )
        })}
      </ol>
    </div>
  </div>
  )
}

export default Shelf