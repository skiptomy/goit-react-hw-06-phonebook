import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsItem.module.css';

const ContactsItem = ({ contact: { id, name, number }, deleteContact }) => (
  <>
    <span className={styles.name}>{name}</span>
    <span className={styles.number}>{number}</span>

    <button className={styles.removeBtn} type="button" id={id} onClick={() => deleteContact(id)}>
      Delete
    </button>
  </>
);

ContactsItem.propTypes = {
  contact: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default ContactsItem;
