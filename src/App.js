import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "./page/Home/Home";
import Dashboard from "./page/Dashboard/Dashboard";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/:country'} element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
