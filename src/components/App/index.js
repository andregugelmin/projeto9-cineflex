import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.css";

import Header from "../Header";
import MovieSelect from '../MovieSelect';
import TimeSelect from '../TimeSelect';
import SessionSelect from '../SessionSelect';
import SelectionSuccess from '../SelectionSuccess';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<MovieSelect />} />
            <Route path="/movie/:movieId" element={<TimeSelect/>} />
            <Route path="/session" element={<SessionSelect/>} />
            <Route path="/success" element={<SelectionSuccess/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;