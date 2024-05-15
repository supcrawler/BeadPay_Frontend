import axios from 'axios';

const API_URL = 'https://localhost:7235/api/contacts';

const getAllContacts = () => {
    return axios.get(API_URL);
};

const getContactById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createContact = (contact) => {
    return axios.post(API_URL, contact);
};

const updateContact = (id, contact) => {
    return axios.put(`${API_URL}/${id}`, contact);
};

const deleteContact = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const searchContactsByName = (name) => {
    return axios.get(`${API_URL}/search/name?name=${name}`);
};

const searchContactsByPhoneNumber = (phoneNumber) => {
    return axios.get(`${API_URL}/search/phonenumber?phoneNumber=${phoneNumber}`);
};

export {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    searchContactsByName,
    searchContactsByPhoneNumber
};
