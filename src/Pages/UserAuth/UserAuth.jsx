import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import hero from "../assets/login-hero.jpg";
import logo from "../assets/logo.png";
import {loginUser, registerUser} from "../../Api/UserApi"
import Loading from '../Loading/Loading';

export default function UserAuth({logInUser}) {
  let navigate = useNavigate();
  let params = useParams();

  const [path, setPath] = useState("");
  const [error, setError] = useState([{ path: "", message: "" }]);
  const [load, setLoad] = useState(false);

  const [loginUserData, setloginUserData] = useState({
    email: "",
    password: "",
  });

  const [registerUserData, setRegisterUserData] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  useEffect(() => {
    setPath(document.location.pathname);
    setError([]);
  }, [params]);

  function loginInputsChanged(event) {
    let user = { ...loginUserData };
    user[event.target.name] = event.target.value;
    setloginUserData(user);
  }

  function registerInputsChanged(event) {
    let user = { ...registerUserData };
    user[event.target.name] = event.target.value;
    setRegisterUserData(user);
  }

  function loginFormSubmit(event) {
    event.preventDefault();
    if (validateLoginForm()) {
      setLoad(true)
      loginUser(loginUserData,(data)=>{
        setLoad(false)
        if (data.message === "success"){
          localStorage.setItem('userToken',data.token)
          logInUser()
          navigate('/')
        } else if (data.message === "incorrect password") {
          setError([{path:"password",message:"incorrect password"}])
        } else {
          setError([{path:"email",message:data.message}])
        }
      })
    }
  }

  function registerFormSubmit(event) {
    event.preventDefault();
    if (validateRegisterForm()) {
      setLoad(true)
      registerUser(registerUserData,(data)=>{
        setLoad(false)
        if(data.message === "success"){
          navigate('/login')
        }else if(data.errors?.email) {
          setError([{path:"email",message:data.errors.email.message}])
        } 
      })
    }
  }

  function validateLoginForm() {
    let scheme = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required()
        .label("email"),
      password: Joi.string()
        .pattern(/^[A-Za-z0-9]{6,25}/)
        .required()
        .label("password")
        .messages({
          "string.pattern.base": `"password" should have at least 6 char or number`,
        }),
    });

    let result = scheme.validate(loginUserData, { abortEarly: false });
    if (result.error) {
      let errArr = [];
      result.error.details.map((err) =>
        errArr.push({
          path: err.path[0],
          message: err.message,
        })
      );
      setError(errArr);
      return false;
    } else {
      setError([{}]);
      return true;
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(10).required().label("first name"),
      last_name: Joi.string().min(3).max(10).required().label("last name"),
      age: Joi.number().min(16).max(80).required().label("age"),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required()
        .label("email"),
      password: Joi.string()
        .pattern(/^[A-Za-z0-9]{6,25}/)
        .required()
        .label("password")
        .messages({
          "string.pattern.base": `"password" should have at least 6 char or number`,
        }),
    });
    let result = scheme.validate(registerUserData, { abortEarly: false });

    if (result.error) {
      let errArr = [];
      result.error.details.map((err) =>
        errArr.push({
          path: err.path[0],
          message: err.message,
        })
      );
      setError(errArr);
      return false;
    } else {
      setError([{}]);
      return true;
    }
  }

  function errAlert(input) {
    return error?.map((err, index) => {
      return err.path === input ? (
        <div key={err + index} className="alert text-danger bg-dark p-2">
          {err.message}
        </div>
      ) : (
        <React.Fragment key={err + index}></React.Fragment>
      );
    });
  }

  function loginDesign() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center py-5 login my-4">
        <img src={logo} className="logo" alt="logo" />
        <h3>Log in to GameOver</h3>
        <form noValidate className="w-100 my-3" onSubmit={loginFormSubmit}>
          <div className="m-auto w-75">
            <input
              type="email"
              name="email"
              autoComplete="off"
              className="form-control mb-3"
              placeholder="email"
              onChange={loginInputsChanged}
            />
            {errAlert("email")}
            <input
              type="password"
              name="password"
              autoComplete="off"
              className="form-control mb-3"
              placeholder="password"
              onChange={loginInputsChanged}
            />
            {errAlert("password")}
            <button type="submit" className="btn btn-dark btn-block">
              Login
            </button>
            <hr />
            <div className="footer d-flex flex-column justify-content-center align-items-center">
              <Link to="/register" className="text-primary">
                forget password{" "}
              </Link>
              <p>
                Not a member yet?{" "}
                <Link className="text-primary" to="/register">
                  create account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }

  function registerDesign() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center py-5 login my-4">
        <h3>Create My Account!</h3>
        <form noValidate className="w-100 my-3" onSubmit={registerFormSubmit}>
          <div className="m-auto w-75">
            <div className="row">
              <div className="col-sm-6">
                <input
                  type="text"
                  name="first_name"
                  autoComplete="off"
                  className="form-control bg-dark border-dark text-white mb-3"
                  placeholder="First Name"
                  onChange={registerInputsChanged}
                />
                {errAlert("first_name")}
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="last_name"
                  autoComplete="off"
                  className="form-control bg-dark border-dark text-white mb-3"
                  placeholder="Last Name"
                  onChange={registerInputsChanged}
                />
                {errAlert("last_name")}
              </div>
            </div>
            <input
              type="email"
              name="email"
              autoComplete="off"
              className="form-control bg-dark border-dark text-white mb-3"
              placeholder="email"
              onChange={registerInputsChanged}
            />
            {errAlert("email")}
            <input
              type="number"
              name="age"
              autoComplete="off"
              className="form-control bg-dark border-dark text-white mb-3"
              placeholder="age"
              onChange={registerInputsChanged}
            />
            {errAlert("age")}
            <input
              type="password"
              name="password"
              autoComplete="off"
              className="form-control bg-dark border-dark text-white mb-3"
              placeholder="password"
              onChange={registerInputsChanged}
            />
            {errAlert("password")}
            <button type="submit" className="btn btn-dark btn-block">
              Login
            </button>
            <hr />
            <div className="footer d-flex flex-column justify-content-center align-items-center">
              <p>
                Already a member?
                <Link className="text-primary" to="/login">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="row">
      <Loading bool={load} />
      <div className="col-md-6 p-0 d-none d-lg-flex">
        <img src={hero} alt="" className="h-100 w-100" />
      </div>
      <div className="col-lg-6 p-0 auth-layout">
        {path === "/register" ? registerDesign() : loginDesign()}
      </div>
    </div>
  );
}
