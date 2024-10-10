import React, {Suspense, lazy} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Details = lazy(() => import("./pages/Details"));

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movie/:id" element={<Details />} />
                    </Routes>
                </Suspense>
            </Router>
        </Provider>
    );
};

export default App;
