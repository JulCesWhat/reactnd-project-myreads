import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import BookShelf from './book-shelf';

// const bookShelf = [
//     {
//         id: 'AA',
//         title: 'Currently Reading',
//         type: 'currentlyReading'
//     },
//     {
//         id: 'AB',
//         title: 'Want to Read',
//         type: 'wantToRead'
//     },
//     {
//         id: 'AC',
//         title: 'Read',
//         type: 'read'
//     }
// ];

class ListBooks extends React.Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title={'Currently Reading'}
                            books={this.props.books.filter((b) => (b.shelf === 'currentlyReading'))}
                            onSelectChange={(shelfType, bookId) => this.props.onSelectChange(shelfType, bookId)} />
                        <BookShelf title={'Want to Read'}
                            books={this.props.books.filter((b) => (b.shelf === 'wantToRead'))}
                            onSelectChange={(shelfType, bookId) => this.props.onSelectChange(shelfType, bookId)} />
                        <BookShelf title={'Read'}
                            books={this.props.books.filter((b) => (b.shelf === 'read'))}
                            onSelectChange={(shelfType, bookId) => this.props.onSelectChange(shelfType, bookId)} />
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => (this.props.history.push('/search'))}>Add a book</button>
                </div>
            </div>
        );
    }
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired
};

export default ListBooks;