import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL
  // baseURL: `http://192.168.1.116:8090`
});
console.log("process :", process.env.REACT_APP_BASEURL)

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const tokenData = localStorage.getItem('pocketbase_auth');

    if (tokenData) {
      const { token } = JSON.parse(tokenData)
      //  console.log(token);
      config.headers.Authorization = `${token}`;

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
