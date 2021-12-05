import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";

const AddTask = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    assignedDepartment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + JSON.parse(localStorage.getItem("auth")).jwtToken;
    axios
      .post("http://localhost:4000/api/task", {
        title: values.title,
        description: values.description,
        assignedDepartment: values.assignedDepartment,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit} className="container mt-5">
        <h3 className="d-flex justify-content-center">Add Task</h3>
        <input
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className="form-control m-2"
          required
          placeholder="Title"
          type="text"
          aria-label="default input example"
        />
        <input
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
          className="form-control m-2"
          required
          placeholder="Description"
          type="text"
          aria-label="default input example"
        />
        <input
          onChange={(e) =>
            setValues({ ...values, assignedDepartment: e.target.value })
          }
          className="form-control m-2"
          required
          placeholder="Assigned Department"
          type="text"
          aria-label="default input example"
        />
        <div className="d-flex align-items-center justify-content-center mt-2">
          <button type="submit" className="btn btn-secondary col-6">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
