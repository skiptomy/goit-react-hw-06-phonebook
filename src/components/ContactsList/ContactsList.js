import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ContactsItem from '../ContactsItem/ContactsItem';
import styles from './ContactsList.module.css';
import listTransition from '../../transition/listTransition.module.css';

const ContactsList = ({ contacts, deleteContact }) => {
  if (contacts.length) {
    return (
      <TransitionGroup component="ul" className={styles.contactsList}>
        {contacts.map(contact => (
          <CSSTransition key={contact.id} timeout={500} unmountOnExit classNames={listTransition}>
            <li className={styles.contactItem}>
              <ContactsItem contact={contact} deleteContact={deleteContact} />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
  return <h3>Contacts not found!</h3>;
};

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
