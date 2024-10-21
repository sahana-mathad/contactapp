import axios from 'axios';

const API_URL = 'http://localhost:8080/contacts';

export async function saveContact(contact) {
	return await axios.post(API_URL, contact);
}

export async function getContacts(page = 0, size = 10) {
	return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getContact(id) {
	return await axios.get(`${API_URL}/${id}`);
}

export async function updateContact(contact) {
	return await axios.post(API_URL, contact);
}

const headers = {
	accept: 'application/json',
	'content-type': 'multipart/form-data'
};

export async function updatePhoto(formData) {
	try {
		console.log('Form data', formData);
		// console.log('PAIA RESPONSE', .data);
		return await axios
			.put(`${API_URL}/photo`, formData, {
				headers: {
					accept: 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data}`
				}
			})
			.then((res) => {
				console.log('After call the data is', res.data);
			});
	} catch (error) {
		console.log(error.response);
	}
}

export async function deleteContact(id) {
	return await axios.delete(`${API_URL}/${id}`);
}
