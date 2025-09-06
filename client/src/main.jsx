import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import "./styles/globals.css";

ReactDOM.createRoot( document.getElementById( "root" ) ).render(
 <BrowserRouter>
  <App />
 </BrowserRouter>
);
