import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import BookActions from './book-actions';

const defaultImg = "https://placekitten.com/128/193";

function BookShelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        props.books.map((b) => (
                            <li key={b.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                            style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks && b.imageLinks.thumbnail.length ? b.imageLinks.thumbnail : defaultImg}")` }}></div>
                                        <BookActions
                                            shelf={b.shelf}
                                            onSelectChange={(shelfType) => props.onSelectChange(shelfType, b.id)} />
                                    </div>
                                    <div className="book-title">{b.title}</div>
                                    <div className="book-authors">
                                        {
                                            b.authors && b.authors.length ? b.authors.join(', ') : ''
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired
};

export default BookShelf;