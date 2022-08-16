import React, { useState } from 'react'

function SearchComponent(props) {
    const [searchItem, setSearchItem] = useState('')

    const searchItemUpater =(event)=>{
        console.log(event.target.value);
        setSearchItem(event.target.value)
    }
    const search = ()=>{
        console.log(searchItem);
    }
  return (
    <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => props.setShowSearchpage(false)}
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
        value={searchItem}
            onChange={searchItemUpater}
          type="text"
          placeholder="Search by title, author, or ISBN"
        />
        <button onClick={search} >Search</button>
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid"></ol>
    </div>
  </div>
  )
}

export default SearchComponent