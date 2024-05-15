import React, { useState, useEffect } from 'react';
import { createContact, updateContact, getContactById } from '../services/ContactService';

const ContactForm = ({ contactId, onSave }) => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumbers: ['']
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (contactId) {
            getContactById(contactId).then(response => {
                setContact(response.data);
            });
        } else {
            setContact({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumbers: ['']
            });
        }
    }, [contactId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handlePhoneNumberChange = (index, value) => {
        const phoneNumbers = [...contact.phoneNumbers];
        phoneNumbers[index] = value;
        setContact({ ...contact, phoneNumbers });
    };

    const handleAddPhoneNumber = () => {
        setContact({ ...contact, phoneNumbers: [...contact.phoneNumbers, ''] });
    };

    const handleRemovePhoneNumber = (index) => {
        const phoneNumbers = contact.phoneNumbers.filter((_, i) => i !== index);
        setContact({ ...contact, phoneNumbers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contactId) {
            updateContact(contactId, contact).then(onSave).catch(err => {
                if (err.response && err.response.status === 409) {
                    setError(err.response.data.message);
                }
            });
        } else {
            createContact(contact).then(onSave).catch(err => {
                if (err.response && err.response.status === 409) {
                    setError(err.response.data.message);
                }
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label className="form-label">First Name:</label>
                <input type="text" className="form-control" name="firstName" value={contact.firstName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Last Name:</label>
                <input type="text" className="form-control" name="lastName" value={contact.lastName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" name="email" value={contact.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone Numbers:</label>
                {contact.phoneNumbers.map((phoneNumber, index) => (
                    <div className="input-group mb-2" key={index}>
                        <input
                            type="text"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                            required
                        />
                        <button type="button" className="btn btn-danger" onClick={() => handleRemovePhoneNumber(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddPhoneNumber}>Add Phone Number</button>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
};

export default ContactForm;
