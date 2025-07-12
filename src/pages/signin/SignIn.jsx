import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../signin/SignIn.scss";
const SignIn = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (u) => u.email === input.email && u.password === input.password
    );

    if (userFound) {
      localStorage.setItem("isLoggedIn", true);
      alert("Signed in successfully!");
      history.push("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
