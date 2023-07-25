import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        // Authorization:
        //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NGI2YWQ4NGE4YmNlNTMzZGM1OTlmZDkiLCJpYXQiOjE2ODk3ODE2Mzd9.clIzYWCPYh3GQ2giocAoXRATPdrIHRsSSNe-Fgnxbjk',
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosClient;
