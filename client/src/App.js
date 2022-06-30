import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { v4 as uuidV4 } from "uuid";
import { TextEditor } from "./components/TextEditor";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={<Navigate replace to={`/documents/${uuidV4()}`} />}
        />

        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}
