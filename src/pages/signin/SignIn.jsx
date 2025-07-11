import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // جلب المستخدمين المسجلين
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // البحث عن المستخدم مع البريد وكلمة المرور
    const userFound = users.find(
      (u) => u.email === input.email && u.password === input.password
    );

    if (userFound) {
      localStorage.setItem("isLoggedIn", true);
      alert("تم تسجيل الدخول بنجاح!");
      history.push("/"); // توجيه لصفحة الرئيسية
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px #ccc",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    fontSize: "1.1rem",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SignIn;
