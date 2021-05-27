import request from '../utils/Fetch'

export const getContact = () => request.get('contact');

export const getContactDetail = (id) => request.get(`contact/${id}`);

export const postContact = (payload) => request.post('contact',payload);

export const delContact = (id) => request.del(`contact/${id}`);

export const putContact = (id, payload) => request.put(`contact/${id}`, payload);
