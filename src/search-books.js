import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import BookShelf from './book-shelf';
import { search } from './BooksAPI';

class SearchBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            foundBooks: []
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        let newValue = event.target.value;
        this.setState({ value: newValue });
        if (newValue.length) {
            search(newValue)
                .then((res) => {
                    if (this.state.value.length) {
                        let updatedRes = (res || []).map((resBook) => {
                            let existingBook = this.props.books.find((b) => (b.id === resBook.id));
                            if (existingBook) {
                                resBook = {...resBook, shelf: existingBook.shelf}
                            } else {
                                resBook = {...resBook, shelf: 'none'}
                            }
                            return resBook;
                        });
                        this.setState({ foundBooks: updatedRes });
                    } else {
                        this.setState({ foundBooks: [] });
                    }
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({ foundBooks: [] });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => (this.props.history.push('/'))}>Close</button>
                    <div className="search-books-input-wrapper">
                        <form>
                            <input type="text"
                                placeholder="Search by title or author"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </form>

                    </div>
                </div>
                <div className="search-books-results">
                    {
                        this.state.foundBooks.length ? (
                            <BookShelf title={'Found Books'}
                                books={this.state.foundBooks}
                                onSelectChange={(shelfType, bookId) => this.props.onSelectChange(shelfType, bookId)} />
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired
};

export default SearchBooks;