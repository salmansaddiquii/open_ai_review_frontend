import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { URL } from "../utils/URL";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [visible, setvisible] = useState(false);
  const { setuser, settoken, setisLoggedIn } = useAuth();
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const onClickLogin = async () => {
    try {
      if (email && password) {
        setloading(true);
        const res = await axios.post(`${URL}auth/login`, {
          email,
          password,
        });
        console.log(res.data);
        if (res.data?.success) {
          setloading(false);
          const user = res?.data?.data;
          setisLoggedIn(true);
          setuser(user);
          settoken(user?.auth_token);
          localStorage.setItem("token", user?.auth_token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          alert(`${res?.data?.message}`);
        }
      } else {
        setloading(false);
        alert("Email and password are required ");
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  <span class="material-icons-outlined"></span>;

  return (
    <div className="d-flex justify-content-center align-items-center primary-color main-container">
      <div className="login-box w-25">
        <h1 className="text-center">Login</h1>
        <div className="my-3">
          <input
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            type="email"
            className="form-control"
          />
        </div>
        <div className="position-relative password-field">
          <input
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            type={visible ? "text" : "password"}
            className="form-control"
          />
          <span
            onClick={() => setvisible(!visible)}
            className="material-icons-outlined"
          >
            {visible ? "visibility" : "visibility_off"}
          </span>
        </div>
        <a
          href=""
          className="text-decoration-none text-center d-block mt-2 forget-password"
        >
          Forgot Password?
        </a>
        <Button className="btn btn-primary w-100 mt-3 " onClick={onClickLogin}>
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
