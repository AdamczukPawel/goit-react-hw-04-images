import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit, query, setQueryInput }) => {
  const handleSubmition = event => {
    event.preventDefault();
    if (query === '') {
      alert('Enter what images you want to see');
      return;
    }
    onSubmit(query);
  };

  const handleChange = event => {
    setQueryInput(event.target.value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmition}>
        <button type="submit" className={css.button}>
          <span className={css.button__label}>Search</span>
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="input"
          onChange={handleChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQueryInput: PropTypes.func.isRequired,
};
