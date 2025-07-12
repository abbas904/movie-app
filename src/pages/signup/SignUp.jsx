import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUpEnhanced = () => {
  const [input, setInput] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (input.password !== input.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await signup(input.email, input.password);
      if (result.success) {
        alert(result.message);
        history.push("/signin");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={input.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div style={styles.links}>
        <p>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => history.push("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
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
    direction: "ltr",
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
    textAlign: "left",
  },
  button: {
    padding: "12px",
    fontSize: "1.1rem",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  error: {
    color: "#d32f2f",
    fontSize: "0.9rem",
    marginTop: "5px",
    textAlign: "left",
  },
  links: {
    marginTop: "20px",
    fontSize: "0.9rem",
  },
  link: {
    color: "#d32f2f",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default SignUpEnhanced;
