import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import styles from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import phonebookAction from '../redux/phonebookAction';
import filterTransition from '../transition/filterTransition.module.css';

class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    filter: PropTypes.string.isRequired,
    deleteContact: PropTypes.func.isRequired,
    getContact: PropTypes.func.isRequired,
    filterInput: PropTypes.func.isRequired,
  };

  contactsFilter = () => {
    return this.props.contacts.filter(contact => contact.name.toLowerCase().includes(this.props.filter.toLowerCase()));
  };

  render() {
    const { getContact, contacts, filter, filterInput, deleteContact } = this.props;
    return (
      <div className={styles.container}>
        <ContactForm getContact={getContact} contacts={contacts} />

        <h2 className="sectionTitle">Contacts</h2>
        <CSSTransition in={contacts.length > 1} timeout={250} classNames={filterTransition} unmountOnExit>
          <Filter filter={filter} filterInput={filterInput} />
        </CSSTransition>
        <ContactsList contacts={this.contactsFilter()} deleteContact={deleteContact} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contactItems,
    filter: state.contacts.filter,
  };
};

const mapDispatchToProps = {
  getContact: phonebookAction.getContact,
  deleteContact: phonebookAction.deleteContact,
  filterInput: phonebookAction.filterInput,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
