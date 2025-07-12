import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignUpEnhanced = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { register } = useAuth();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (user.username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const { confirmPassword, ...userData } = user;
      const result = await register(userData);

      if (result.success) {
        alert(result.message);
        history.push('/signin');
      } else {
        setError(result.message);
      }
    } catch {
      setError("An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.signinPage}>
      <div style={styles.signinContainer}>
        <h2 style={styles.title}>Create New Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
            style={styles.input}
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            style={styles.input}
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            style={styles.input}
            disabled={loading}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
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
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div style={styles.links}>
          <p>
            Already have an account?{' '}
            <span style={styles.link} onClick={() => history.push('/signin')}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  signinPage: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    padding: '1rem',
  },
  signinContainer: {
    maxWidth: '400px',
    width: '100%',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    direction: 'ltr',
  },
  title: {
    marginBottom: '25px',
    color: '#2575fc',
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    textAlign: 'left',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '14px',
    fontSize: '1.2rem',
    backgroundColor: '#2575fc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(37,117,252,0.6)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginTop: '5px',
    textAlign: 'left',
  },
  links: {
    marginTop: '20px',
    fontSize: '0.9rem',
    color: '#444',
  },
  link: {
    color: '#2575fc',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default SignUpEnhanced;
