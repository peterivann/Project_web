import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./js/webapp/js/view_model/Router/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppRouter></AppRouter>
    </React.StrictMode>
);