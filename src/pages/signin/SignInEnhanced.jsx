import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignInEnhanced = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { login } = useAuth();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(input.email, input.password);
      if (result.success) {
        alert(result.message);
        history.push("/");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.links}>
          <p>
            Don't have an account?{" "}
            <span style={styles.link} onClick={() => history.push("/signup")}>
              Create a new account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    width: "100vw",
    height: "100vh",
    backgroundImage:
      'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "400px",
    width: "90%",
    padding: "30px 20px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 0 15px rgba(0,0,0,0.25)",
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

export default SignInEnhanced;
