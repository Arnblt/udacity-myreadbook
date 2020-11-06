import React from "react";
import { Route } from "react-router-dom";
import Search from "./Search";
import Books from "./Books";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ReactLoading from "react-loading";

class MyReadsApp extends React.Component {
  state = { myBookList: [], isLoading: true };

  componentDidMount() {
    BooksAPI.getAll().then((myBookList) => {
      this.setState({ myBookList, isLoading: false });
    });
  }

  updateBookStatus = (targetBook, status) => {
    BooksAPI.update(targetBook, status).then((response) => {
      targetBook.shelf = status;
      this.setState((prevState) => ({
        myBookList: prevState.myBookList
          .filter((book) => book.id !== targetBook.id)
          .concat(targetBook),
      }));

      let statusName = "none";
      if (status === "read") statusName = "Reading";
      else if (status === "currentlyReading") statusName = "Currently Reading";
      else if (status === "wantToRead") statusName = "Want To Read";

      alert(
        `${targetBook.title} by ${targetBook.authors} is now on your  ${statusName} shelf!`
      );
    });
  };

  loadingPanel() {
    return (
      <div className="books-grid">
        <ReactLoading type="spinningBubbles" color="#2e7c31" />
      </div>
    );
  }
  render() {
    const { myBookList, isLoading } = this.state;

    if (!isLoading) {
      return (
        <div className="app">
          <Route
            path="/"
            exact
            render={() => (
              <Books
                myBookList={myBookList}
                updateBookStatus={this.updateBookStatus}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <Search
                myBookList={myBookList}
                updateBookStatus={this.updateBookStatus}
              />
            )}
          />
        </div>
      );
    } else {
      return this.loadingPanel();
    }
  }
}

export default MyReadsApp;
