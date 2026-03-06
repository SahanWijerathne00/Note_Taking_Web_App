import axios from "axios";

const API = "http://localhost:5000/api/notes";

export const getNotes = async (token) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createNote = async (noteData, token) => {
  return axios.post(API, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateNote = async (id, noteData, token) => {
  return axios.put(`${API}/${id}`, noteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteNote = async (id, token) => {
  return axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
