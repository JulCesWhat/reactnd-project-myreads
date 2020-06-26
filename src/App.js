import React from 'react';
// import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import ListBooks from './list-books';
import SearchBooks from './search-books';
import { getAll } from './BooksAPI';

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount() {
		getAll()
			.then((res) => {
				console.log(res);
				this.setState({
					books: res
				});
			});
	}

	onSelectChange(item, bookId) {
		console.log('capi  -->  ' + item + '   ' +  bookId)
	}

	render() {
		return (
			<div className="app">
				<Router>
					<Switch>
						<Route exact path="/"
							render={(props) => (<ListBooks {...props} books={this.state.books}
							onSelectChange={(item, bookId) => (this.onSelectChange(item, bookId))} />)}>
						</Route>
						<Route path="/search"
							render={(props) => (<SearchBooks {...props} />)}>
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default BooksApp
