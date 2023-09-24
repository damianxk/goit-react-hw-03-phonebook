import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => (
  <ul className={css.list}>
    {contacts.map(({ id, name, number }) => (
      <li className={css.item} key={id}>
        {name}: {number}
        <button
          type="button"
          className={css.button}
          onClick={() => deleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
};
