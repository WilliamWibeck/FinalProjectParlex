import "./App.css";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import CenteringWrapper from "./components/CenteringWrapper";
import GameBoard from "./components/GameBoard/GameBoard";
import CompleteSentence from "./components/CompleteSentence/CompleteSentence";
import WordOrder from "./components/WordOrder/WordOrder";
import WordBank from "./components/AdminPage/WordBank";
import TestComponent from "./components/TestComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CenteringWrapper>
                <Dashboard />
              </CenteringWrapper>
            </ProtectedRoute>
          }
        />
        <Route path="/wordbank" element={<WordBank />} />
        <Route path="/flashcards" element={<GameBoard />} />
        <Route path="/completesentence" element={<CompleteSentence />} />
        <Route path="/wordorder" element={<WordOrder />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
