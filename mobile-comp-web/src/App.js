import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Credit from "./pages/Credit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/credit" element={<Credit />} />
    </Routes>
  );
}

export default App;