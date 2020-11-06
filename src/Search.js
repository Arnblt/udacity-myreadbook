import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksDetail from "./BooksDetail";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class Search extends Component {
  static propTypes = {
    myBookList: PropTypes.array.isRequired,
    updateBookStatus: PropTypes.func.isRequired,
  };

  state = {
    books: [],
    query: "",
  };

  UpdateQuery(query) {
    BooksAPI.search(query).then((books) =>
      books ? this.setState({ books }) : []
    );
    this.setState({ query });
  }

  SearchResults() {
    const { books, query } = this.state;
    const { myBookList, updateBookStatus } = this.props;
    if (query) {
      return books.error ? (
        <div>No results found</div>
      ) : (
        books.map((book, index) => {
          return (
            <BooksDetail
              key={index}
              targetBook={book}
              myBookList={myBookList}
              updateBookStatus={updateBookStatus}
            />
          );
        })
      );
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Back to Main Page
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.UpdateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.SearchResults()}</ol>
        </div>
      </div>
    );
  }
}
export default Search;
