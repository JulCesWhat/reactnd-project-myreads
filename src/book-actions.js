import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class BookActions extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { value: this.props.shelf };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.props.onSelectChange(event.target.value);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <form className="book-shelf-form">
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </form>
            </div>
        );
    }
}

BookActions.propTypes = {
    shelf: PropTypes.string.isRequired,
    onSelectChange: PropTypes.func.isRequired
};

export default BookActions;