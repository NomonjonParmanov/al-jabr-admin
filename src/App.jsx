import GetQuestions from "./components/GetQuestions";
import "./components/admin.scss";
import Questions from "./components/Questions";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GetQuestions />} />
        <Route path="/create" element={<Questions />} />
      </Routes>
    </>
  );
}

export default App;
