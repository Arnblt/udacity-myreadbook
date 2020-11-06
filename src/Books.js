import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksDetail from "./BooksDetail";

const sectionTypes = {
  currentlyReading: {
    title: "Currently Reading",
    key: "currentlyReading",
  },
  read: {
    title: "Read",
    key: "read",
  },
  wantToRead: {
    title: "Want To Read",
    key: "wantToRead",
  },
};

class Books extends Component {
  setSection(sectionType) {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{sectionType.title}</h2>
        {this.loadBook(sectionType)}
      </div>
    );
  }

  loadBook(sectionType) {
    const { myBookList, updateBookStatus } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {myBookList.map((book, index) => {
            if (book.shelf === sectionType.key) {
              return (
                <BooksDetail
                  key={index}
                  targetBook={book}
                  myBookList={myBookList}
                  updateBookStatus={updateBookStatus}
                />
              );
            } else {
              return null;
            }
          })}
        </ol>
      </div>
    );
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.setSection(sectionTypes.currentlyReading)}
            {this.setSection(sectionTypes.wantToRead)}
            {this.setSection(sectionTypes.read)}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Click to Add New Book</Link>
        </div>
      </div>
    );
  }
}

export default Books;
