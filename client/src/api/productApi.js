import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};