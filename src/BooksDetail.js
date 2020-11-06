import React, { Component } from "react";
import PropTypes from "prop-types";

class BooksDetails extends Component {
  static propTypes = {
    targetBook: PropTypes.object.isRequired,
    myBookList: PropTypes.array.isRequired,
    updateBookStatus: PropTypes.func.isRequired,
  };

  updateBookStatus = (event) => {
    this.props.updateBookStatus(this.props.targetBook, event.target.value);
  };

  render() {
    const { targetBook, myBookList } = this.props;

    let currentStatus = "none";
    for (let item of myBookList) {
      if (item.id === targetBook.id) {
        currentStatus = item.shelf;
        break;
      }
    }

    let bookCover =
      targetBook.imageLinks && targetBook.imageLinks.thumbnail
        ? targetBook.imageLinks.thumbnail
        : null;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${bookCover})`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={this.updateBookStatus}
                defaultValue={currentStatus}
                value={currentStatus}
              >
                <option value="moveTo" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{targetBook.title}</div>
          <div className="book-authors">{targetBook.authors}</div>
        </div>
      </li>
    );
  }
}

export default BooksDetails;
