import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { Dropdown } from "react-bootstrap";

const Tasks = () => {
  const [tasks, setTasks] = useState("");
  const { userData } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("");
  const [title, setTitle] = useState("All Tasks");

  const getTask = async () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + JSON.parse(localStorage.getItem("auth")).jwtToken;
    axios
      .get("http://localhost:4000/api/task")
      .then((res) => setTasks(res.data));
  };

  // const task = JSON.stringify(tasks).payload;
  const task = tasks.payload;

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      <Header />

      <div className="container d-flex justify-content-center mt-5">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {title}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                setFilter(task);
                setTitle(e.target.innerText);
              }}
            >
              All Tasks
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setFilter(
                  task.filter(
                    (task) => +task.assignedDepartment === userData.department
                  )
                );
                setTitle(e.target.innerText);
              }}
            >
              Department Tasks
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setFilter(task.filter((task) => task.user.id === userData.id));
                setTitle(e.target.innerText);
              }}
            >
              My Tasks
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex flex-wrap m-5">
        {filter
          ? filter.map((data) => (
              <TaskCard setTasks={setTasks} task={data} name={title} />
            ))
          : task?.map((data) => <TaskCard setTasks={setTasks} task={data} />)}
        {/* {task && task.map((data) => <TaskCard task={data} />)} */}
      </div>
    </div>
  );
};

export default Tasks;
