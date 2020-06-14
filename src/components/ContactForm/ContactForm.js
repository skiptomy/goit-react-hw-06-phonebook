import React, { Component } from 'react';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import Alert from '../Alert/Alert';
import alertTransition from '../../transition/alertTransition.module.css';
import titleAnimation from '../../transition/titleAnimation.module.css';

class ContactForm extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    getContact: PropTypes.func.isRequired,
  };

  state = { name: '', number: '', isActive: false, isShow: false };

  componentDidMount() {
    this.setState({ isShow: true });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  contactsVerification = () => {
    return this.props.contacts.some(contact => contact.name === this.state.name);
  };

  submitForm = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (this.contactsVerification()) {
      this.setState({ isActive: true });
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 3000);
    } else {
      const newContact = { id: shortid.generate(), name, number };
      this.props.getContact(newContact);

      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number, isActive, isShow } = this.state;
    return (
      <div>
        <CSSTransition in={isShow} timeout={500} classNames={titleAnimation} unmountOnExit>
          <h2 className="sectionTitle">Phonebook</h2>
        </CSSTransition>
        <form className={styles.form} onSubmit={this.submitForm}>
          <CSSTransition in={isActive} timeout={250} classNames={alertTransition} unmountOnExit>
            <Alert />
          </CSSTransition>

          <label>
            Name
            <input
              className={styles.inputField}
              type="text"
              placeholder="Name..."
              value={name}
              name="name"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Number
            <input
              className={styles.inputField}
              placeholder="Tel..."
              type="text"
              value={number}
              name="number"
              onChange={this.handleChange}
              required
            />
          </label>
          <button className={styles.submitBtn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
