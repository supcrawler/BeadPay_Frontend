import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getAllContacts, deleteContact, searchContactsByName, searchContactsByPhoneNumber } from '../services/ContactService';
import ContactForm from './ContactForm';
import './ContactList.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContactId, setEditingContactId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = () => {
        getAllContacts().then(response => {
            setContacts(response.data);
        });
    };

    const handleDelete = (id) => {
        deleteContact(id).then(loadContacts);
    };

    const handleSearchByName = (e) => {
        const name = e.target.value;
        if (name) {
            searchContactsByName(name).then(response => {
                setContacts(response.data);
            });
        } else {
            loadContacts();
        }
    };

    const handleSearchByPhoneNumber = (e) => {
        const phoneNumber = e.target.value;
        if (phoneNumber) {
            searchContactsByPhoneNumber(phoneNumber).then(response => {
                setContacts(response.data);
            });
        } else {
            loadContacts();
        }
    };

    const handleAddContact = () => {
        setEditingContactId(null);
        setShowModal(true);
    };

    const handleEdit = (id) => {
        setEditingContactId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setEditingContactId(null);
        setShowModal(false);
        loadContacts();
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Contacts</h1>
            <div className='row'>
                <div className='col-6 col-md-6'>
                    <Button className="mb-3" onClick={handleAddContact}>Add Contact</Button>
                </div>
                <div className='col-3 col-md-3 '>
                    <div className="mb-3">
                        <input type="text" className="form-control mb-2" placeholder="Search by name" onChange={handleSearchByName} />                        
                    </div>
                </div>
                <div className='col-3 col-md-3 '>
                    <div className="mb-3">
                        <input type="text" className="form-control mb-2" placeholder="Search by name" onChange={handleSearchByName} />
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Numbers</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phoneNumbers.join(', ')}</td>
                            <td>
                                <Button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(contact.id)}>Edit</Button>
                                <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-right">
                <Modal.Header closeButton>
                    <Modal.Title>{editingContactId ? 'Edit Contact' : 'Add Contact'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm contactId={editingContactId} onSave={handleCloseModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ContactList;
