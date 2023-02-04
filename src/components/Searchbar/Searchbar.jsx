import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query === '') {
      alert('Enter what images you want to see');
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button__label}>Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            name="input"
            onChange={this.handleChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
