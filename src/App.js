import React from 'react';
// import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import ListBooks from './list-books';
import SearchBooks from './search-books';
import { getAll, update, get } from './BooksAPI';

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount() {
		getAll()
			.then((res) => {
				this.setState({
					books: res
				});
			});
	}

	onSelectChange(shelfType, bookId) {
		update({ id: bookId }, shelfType)
			.then((res) => {
				let bookToUpdate = this.state.books.find((b) => (b.id === bookId));
				if (bookToUpdate) {
					if (bookToUpdate.shelf !== shelfType) {
						this.saveFoundBook(shelfType, bookId, bookToUpdate);
					}
				} else {
					get(bookId)
						.then((res) => {
							this.saveFoundBook(shelfType, bookId, res);
						}).catch((err) => {
							console.log(err);
						});
				}
			}).catch((err) => {
				console.log(err);
			});
	}

	saveFoundBook = (shelfType, bookId, bookToUpdate) => {
		let otherBooks = this.state.books.filter((b) => (b.id !== bookId));
		bookToUpdate.shelf = shelfType;
		otherBooks.push(bookToUpdate);
		this.setState({
			books: otherBooks
		});
	}

	render() {
		return (
			<div className="app">
				<Router>
					<Switch>
						<Route exact path="/"
							render={(props) => (<ListBooks {...props} books={this.state.books}
								onSelectChange={(shelfType, bookId) => (this.onSelectChange(shelfType, bookId))} />)}>
						</Route>
						<Route path="/search"
							render={(props) => (<SearchBooks {...props}
								books={this.state.books}
								onSelectChange={(shelfType, bookId) => (this.onSelectChange(shelfType, bookId))} />)}>
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default BooksApp
