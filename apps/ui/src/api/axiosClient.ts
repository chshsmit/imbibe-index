import axios from "axios";
import { auth } from "../firebase";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

const getUserToken = async () => {
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log({ token });
        resolve(token);
      } else {
        resolve(null);
      }
      unsub();
    });
  });
};

axiosClient.interceptors.request.use(async (request) => {
  const token = await getUserToken();
  // If the user is logged in then we want to add the token
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export default axiosClient;
