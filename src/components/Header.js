import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { userData } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar-brand" href="#">
          CrossTech
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/dashboard/tasks" className="nav-link">
                Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dashboard/addtask" className="nav-link">
                Add Task
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Department
              </a>
            </li>
          </ul>
          <div>
            <FaUserCircle
              className="text-secondary m-2"
              style={{ width: "25px", height: "25px" }}
            />
            <span className="navbar-text">{userData.email}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
