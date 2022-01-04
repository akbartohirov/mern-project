import React, { useState, useEffect, useContext } from "react";
import useHttp from "../hooks/http.hooks";
import useMessage from "../hooks/message.hook";
import AuthContext from "../context/AuthContext";
import baseURL from "../baseURL";

const AuthPage = () => {
  const { error, loading, postReq, clearError } = useHttp();
  const message = useMessage();
  const auth = useContext(AuthContext);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await postReq(
        `${baseURL}/api/auth/register`,
        { ...form },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data) {
        message(data.data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitLogin = async (e) => {
    try {
      const data = await postReq(`${baseURL}/api/auth/login`, { ...form });
      auth.login(data.data.token, data.data.user._id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten the link</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div className="input-field">
              <input
                onChange={(e) => onChange(e)}
                value={form.email}
                type="text"
                name="email"
                id="email"
                placeholder="Email..."
                required
              />
            </div>

            <div className="input-field">
              <input
                onChange={(e) => onChange(e)}
                value={form.password}
                type="text"
                name="password"
                id="password"
                placeholder="Password..."
                required
              />
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              onClick={(e) => onSubmitRegister(e)}
              className="btn green darken-1 mr-1"
            >
              Sign up
            </button>
            <button
              onClick={(e) => onSubmitLogin(e)}
              disabled={loading}
              className="btn blue darken-1"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
