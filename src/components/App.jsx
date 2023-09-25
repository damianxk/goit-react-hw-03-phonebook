import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

import './App.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  constructor() {
    super();
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    this.state.contacts = parsedContacts || [];
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (!name || !number) {
      alert('Please enter a name and number');
      return;
    }

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} already exists`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    if (this.state.contacts.length < 1) {
      localStorage.clear();
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} changeFilter={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
