// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

import Api from "../services/Api";

import "./Login.css";
import wintaylorLogo from "../assets/wintaylor_logo.svg";
import FlashMessage from "./components/FlashMessage";

function Login({ history }) {
  const [fleshMessage, setFleshMessage] = useState({ status: false });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("user");
    if (id) {
      history.push(`/main/${id}`);
    }
  }, [history]);

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await Api.post("sessions", {
      email: userEmail,
      password: userPassword
    }).catch(error => {
      console.error(error);
    });

    if (!result) {
      setFleshMessage({
        message: 'email or password is wrong!',
        status: true
      });
      return;
    }

    const { user, token } = result.data;

    setFleshMessage({ status: false });
    localStorage.setItem("token", token);

    if (user.name === "wintaylorAdmin426") {
      history.push(`/admin`);
    } else {
      history.push(`/main/${user.id}`);
    }
  }

  return (
    <div className="login-container">
      <h2> Game Voting </h2> <img src={wintaylorLogo} alt="Wintaylor Logo" />
      <form onSubmit={handleSubmit}>
        <input
          className="box"
          type="email"
          placeholder="Enter with your business email"
          onChange={e => setUserEmail(e.target.value)}
          required
        />
        <input
          className="box"
          type="password"
          placeholder="Password"
          onChange={e => setUserPassword(e.target.value)}
          required
        />
        <button className="box" type="submit">
          Login
        </button>
        <FlashMessage
          data={fleshMessage}
          closeHandler={() => setFleshMessage({ status: false })}
        />
      </form>
    </div>
  );
}

export default Login;
