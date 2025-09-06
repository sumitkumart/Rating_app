import axios from "axios";

const api = axios.create( {
 baseURL: "http://localhost:4000/api", 
} );

api.interceptors.request.use( ( config ) => {
 const token = localStorage.getItem( "token" );
 if ( token ) config.headers.Authorization = `Bearer ${token}`;
 return config;
} );

// Response interceptor to handle auth errors
api.interceptors.response.use(
 (response) => response,
 (error) => {
  if (error.response?.status === 401) {
   console.log("Authentication error - clearing tokens");
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   // Redirect to login page
   window.location.href = "/login";
  }
  return Promise.reject(error);
 }
);

export default api;
