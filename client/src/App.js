import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/room/:roomId" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
