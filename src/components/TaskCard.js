import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Alert from "./Alert";

const TaskCard = ({ task, name, setTasks }) => {
  const { id, title, status, description, assignedDepartment, user } = task;
  const { userData } = useSelector((state) => state.auth);

  const [complete, setComplete] = useState("");
  const [reject, setReject] = useState("");
  const [stat, setStat] = useState(status);
  const navigate = useNavigate();
  const [deletedItem, setDeletedItem] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const editClick = () => {
    navigate(`/dashboard/tasks/${id}`, { state: task });
  };

  const deleteClick = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + JSON.parse(localStorage.getItem("auth")).jwtToken;
    axios
      .delete(`http://localhost:4000/api/task/${id}`)
      .then((res) => setDeletedItem(res.data.payload));
    showAlert(true, "danger", "naptın görevi sildin!!!");
  };
  console.log(deletedItem);

  const completeClick = async () => {
    await axios
      .get(`http://localhost:4000/api/task/complete/${id}`)
      .then((res) => setComplete(res.data.payload.status));
    showAlert(true, "success", "görev tamamlandı...");
  };

  const rejectClick = async () => {
    await axios
      .get(`http://localhost:4000/api/task/reject/${id}`)
      .then((res) => setReject(res.data.payload.status));
    showAlert(true, "danger", "görev reddedildi...");
  };

  const getTask = async () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + JSON.parse(localStorage.getItem("auth")).jwtToken;
    axios.get("http://localhost:4000/api/task").then((res) => {
      res.data.payload.map((task) =>
        task.id === id ? setStat(task.status) : null
      );
      setTasks(res.data);
    });
  };

  // const task = JSON.stringify(tasks).payload;

  useEffect(() => {
    getTask();
  }, [complete, reject, deletedItem]);

  return (
    <div className="card border-success m-3" style={{ maxWidth: "18rem" }}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} stat={stat} />}
      <div className="card-header bg-transparent border-success d-flex justify-content-between">
        <div>#{id}</div>
        <div>
          {stat === 0 ? (
            <p className="fst-italic">Pending...</p>
          ) : stat === 1 ? (
            <p className="fst-italic text-success">Completed</p>
          ) : (
            <p className="fst-italic text-danger">Rejected</p>
          )}
        </div>
      </div>
      <div className="card-body text-success">
        <h6 className="card-title">{title}</h6>
        <p className="card-text">{description}</p>
        <h6 className="card-title">
          {user.name} {user.id}
        </h6>
        <h6 className="card-title">Assigned Department:{assignedDepartment}</h6>
      </div>
      {userData.department === +assignedDepartment &&
      name === "Department Tasks" ? (
        <div className="card-footer bg-transparent border-success d-flex justify-content-end">
          {stat === 0 ? (
            <>
              <button
                className="btn btn-success btn-sm me-1"
                onClick={() => completeClick()}
              >
                Complete
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => rejectClick()}
              >
                Reject
              </button>
            </>
          ) : stat === 1 ? (
            <p className="text-success">Completed</p>
          ) : (
            <p className="text-danger">Rejected</p>
          )}
        </div>
      ) : name === "My Tasks" && status === 0 ? (
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={() => editClick()}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={() => deleteClick()}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="card-footer bg-transparent border-success d-flex justify-content-end">
          Çalış Çok Çalış :)
        </div>
      )}
    </div>
  );
};

export default TaskCard;
