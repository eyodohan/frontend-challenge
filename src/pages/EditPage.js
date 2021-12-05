import axios from "axios";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

const EditPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);

  const { title, description } = state;

  const [values, setValues] = useState({
    title: title,
    description: description,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + JSON.parse(localStorage.getItem("auth")).jwtToken;
    await axios
      .put(`http://localhost:4000/api/task/${id}`, {
        title: values.title,
        description: values.description,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <Header />

      <form className="container mt-5" onSubmit={(e) => handleSubmit(e)}>
        <h3 className="d-flex justify-content-center">Edit Task</h3>
        <input
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className="form-control m-2"
          value={values.title}
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
          value={values.description}
          required
          placeholder="Description"
          type="text"
          aria-label="default input example"
        />
        <div className="d-flex align-items-center justify-content-center mt-2">
          <button
            to="/dashboard/tasks"
            type="submit"
            className="btn btn-secondary col-6"
          >
            Edit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
