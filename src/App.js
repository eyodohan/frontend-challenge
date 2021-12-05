import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddTask from "./pages/AddTask";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Tasks from "./pages/Tasks";
import { login } from "./redux/auth";
import EditPage from "./pages/EditPage";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(login(JSON.parse(localStorage.getItem("auth"))));
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/dashboard/tasks" element={<Tasks />} />
            <Route exact path="/dashboard/addtask" element={<AddTask />} />
            <Route exact path="/dashboard/tasks/:id" element={<EditPage />} />
          </>
        ) : (
          <Route exact path="/dashboard" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
