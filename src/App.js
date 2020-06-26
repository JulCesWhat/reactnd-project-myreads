import React from 'react';
// import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css'
import ListBooks from './list-books';
import SearchBooks from './search-books';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <ListBooks />
            </Route>
            <Route path="/search">
              <SearchBooks />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
