import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/auth/login", { email: values.email })
      .then((res) => setData(res.data))
      .catch((err) => alert(err + " Yetkisiz giriş"));
  };

  console.log(state);

  useEffect(() => {
    if (data.code === "loginSuccess") {
      navigate("/dashboard");
      dispatch(login(data));
      localStorage.setItem("auth", JSON.stringify(data.payload));
    }
  }, [data]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="form">
        <div className="d-flex justify-content-center align-items-center">
          <h4>Login</h4>
          <FaUserCircle
            className="mb-2 mx-2 text-primary"
            style={{ width: "25px", height: "25px" }}
          />
        </div>
        <div className="form-floating">
          <input
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">e-mail address</label>
        </div>
        {/* <div className="form-floating">
          <input
            disabled
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div> */}
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={(e) => handleClick(e)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
