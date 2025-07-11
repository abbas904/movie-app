import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // جلب المستخدمين المسجلين سابقا من localStorage (لو موجود)
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // التحقق هل الايميل موجود مسبقاً
    const emailExists = users.some(u => u.email === user.email);

    if (emailExists) {
      alert('هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد آخر.');
      return;
    }

    // اضافة المستخدم الجديد الى القائمة
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert("تم إنشاء الحساب بنجاح!");
    history.push('/signin');  // توجيه لصفحة تسجيل الدخول بعد التسجيل
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
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
  },
  button: {
    padding: '12px',
    fontSize: '1.1rem',
    backgroundColor: '#d32f2f', // أحمر أساسي
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SignUp;
