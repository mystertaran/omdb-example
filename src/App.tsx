import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/index";
import Details from "./pages/Details/index";
import {Provider} from "react-redux";
import {store} from "./store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<Details />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
