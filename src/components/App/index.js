import { BrowserRouter, Routes, Route} from "react-router-dom";

import "./style.css";

import Header from "../Header";
import MovieSelect from '../MovieSelect';
import SessionSelect from '../SessionSelect';
import SeatsSelect from '../SeatsSelect';
import SelectionSuccess from '../SelectionSuccess';


function App() {
  

  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<MovieSelect />} />
            <Route path="/sessions/:movieId" element={<SessionSelect/>} />
            <Route path="/seats/:sessionId" element={<SeatsSelect/>} />
            <Route path="/success" element={<SelectionSuccess/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;