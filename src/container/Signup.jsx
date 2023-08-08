import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../utils/URL";

export default function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [user_name, setuser_name] = useState("");
  const [visible, setvisible] = useState(false);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const onClickLogin = async () => {
    try {
      if (email && password && user_name) {
        setloading(true);
        const res = await axios.post(`${URL}users`, {
          email,
          password,
          username: user_name,
        });
        if (res?.data?.success) {
          setloading(false);
          alert("User Created Successfully");
          navigate("/login");
        } else {
          setloading(false);
          alert(`${res.data?.message}`);
        }
      } else {
        alert("Email and password are required");
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center primary-color main-container">
      <div className="login-box w-25">
        <h1 className="text-center">Signup</h1>
        <div className="my-3">
          <input
            onChange={(e) => setuser_name(e.target.value)}
            placeholder="User Name"
            type="text"
            className="form-control"
          />
        </div>
        <div className="my-3">
          <input
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            type="text"
            className="form-control"
          />
        </div>
        <div className="position-relative password-field">
          <input
            placeholder="Password"
            type={visible ? "text" : "password"}
            className="form-control"
            onChange={(e) => setpassword(e.target.value)}
          />
          <span
            onClick={() => setvisible(!visible)}
            className="material-icons-outlined"
          >
            {visible ? "visibility" : "visibility_off"}
          </span>
        </div>
        <Button className="btn btn-primary w-100 mt-3" onClick={onClickLogin}>
          {loading ? (
            <div className="spinner-border text-light" role="status" />
          ) : (
            "Login"
          )}
        </Button>
        <p className="text-center mt-3">
          Don't have an account{" "}
          <Link className="text-decoration-none" to={"/signup"}>
            signup?
          </Link>
        </p>
      </div>
    </div>
  );
}
