import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from "./page/Home/Home";
import Landing from "./page/Dashboard/Dashboard";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/:country'} element={<Landing />} />
            </Routes>
        </div>
    );
}

export default App;
