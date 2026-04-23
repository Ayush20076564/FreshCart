import axios from "axios";

const BASE_URL = "http://localhost:5000/api/orders";

export const placeOrder = async (orderData) => {
  const response = await axios.post(BASE_URL, orderData);
  return response.data;
};

export const fetchUserOrders = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};