import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, changeFilter }) => (
  <div className={css.filter}>
    <input
      type="text"
      name="filter"
      className={css.inputFilter}
      placeholder="Find contacts"
      value={value}
      onChange={changeFilter}
    />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
