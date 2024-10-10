import React from "react";

import {createRoot} from "react-dom/client";
import App from "./App";

import "./styles/index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <div className="bg-gray-500 min-h-screen">
                <App />
            </div>
        </React.StrictMode>
    );
}
