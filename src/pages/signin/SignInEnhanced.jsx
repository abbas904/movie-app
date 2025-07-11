import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // تأكد أنك عامل الملف

const SignInEnhanced = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { login } = useAuth();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
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
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={input.email}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
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
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>

      <div style={styles.links}>
        <p>
          ليس لديك حساب؟{" "}
          <span
            style={styles.link}
            onClick={() => history.push("/signup")}
          >
            إنشاء حساب جديد
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
    direction: "rtl",
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
    textAlign: "right",
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
    textAlign: "right",
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
