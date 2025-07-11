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
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (user.password !== user.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }
    
    if (user.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return false;
    }
    
    if (user.username.length < 3) {
      setError("اسم المستخدم يجب أن يكون 3 أحرف على الأقل");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // Remove confirmPassword from user data before registration
      const { confirmPassword, ...userData } = user;
      const result = await register(userData);
      
      if (result.success) {
        alert(result.message);
        history.push('/signin');  // Redirect to sign in page
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>إنشاء حساب جديد</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="اسم المستخدم"
          value={user.username}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={user.email}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={user.password}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="تأكيد كلمة المرور"
          value={user.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={loading}
        />
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>
      </form>
      
      <div style={styles.links}>
        <p>
          لديك حساب بالفعل؟{" "}
          <span 
            style={styles.link}
            onClick={() => history.push("/signin")}
          >
            تسجيل الدخول
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px #ccc',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    direction: 'rtl',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    textAlign: 'right',
  },
  button: {
    padding: '12px',
    fontSize: '1.1rem',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginTop: '5px',
    textAlign: 'right',
  },
  links: {
    marginTop: '20px',
    fontSize: '0.9rem',
  },
  link: {
    color: '#d32f2f',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default SignUpEnhanced; 