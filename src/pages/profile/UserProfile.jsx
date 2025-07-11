import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { currentUser, updateProfile, deleteAccount, logout } = useAuth();
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (formData.newPassword && formData.newPassword.length < 6) {
      setError("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
      return false;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }
    
    if (formData.username.length < 3) {
      setError("اسم المستخدم يجب أن يكون 3 أحرف على الأقل");
      return false;
    }
    
    return true;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {
        username: formData.username
      };
      
      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }
      
      const result = await updateProfile(currentUser.email, updateData);
      
      if (result.success) {
        setSuccess(result.message);
        setIsEditing(false);
        setFormData({
          ...formData,
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("حدث خطأ أثناء تحديث الملف الشخصي");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه.")) {
      setLoading(true);
      try {
        const result = await deleteAccount(currentUser.email);
        if (result.success) {
          alert(result.message);
          history.push('/signin');
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("حدث خطأ أثناء حذف الحساب");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    history.push('/signin');
  };

  if (!currentUser) {
    return (
      <div style={styles.container}>
        <h2>يرجى تسجيل الدخول</h2>
        <button 
          onClick={() => history.push('/signin')}
          style={styles.button}
        >
          تسجيل الدخول
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>الملف الشخصي</h2>
      
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={styles.success}>
          {success}
        </div>
      )}
      
      <form onSubmit={handleUpdateProfile} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>اسم المستخدم:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            disabled={!isEditing || loading}
            required
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>البريد الإلكتروني:</label>
          <input
            type="email"
            value={currentUser.email}
            style={{...styles.input, backgroundColor: '#f5f5f5'}}
            disabled
          />
        </div>
        
        {isEditing && (
          <>
            <div style={styles.field}>
              <label style={styles.label}>كلمة المرور الجديدة (اختياري):</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                style={styles.input}
                disabled={loading}
                placeholder="اتركها فارغة إذا لم ترد تغيير كلمة المرور"
              />
            </div>
            
            <div style={styles.field}>
              <label style={styles.label}>تأكيد كلمة المرور الجديدة:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                disabled={loading}
                placeholder="تأكيد كلمة المرور الجديدة"
              />
            </div>
          </>
        )}
        
        <div style={styles.actions}>
          {!isEditing ? (
            <button 
              type="button"
              onClick={() => setIsEditing(true)}
              style={styles.button}
            >
              تعديل الملف الشخصي
            </button>
          ) : (
            <>
              <button 
                type="submit"
                style={{
                  ...styles.button,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                disabled={loading}
              >
                {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    username: currentUser.username,
                    email: currentUser.email,
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setError("");
                  setSuccess("");
                }}
                style={{...styles.button, backgroundColor: '#666'}}
                disabled={loading}
              >
                إلغاء
              </button>
            </>
          )}
        </div>
      </form>
      
      <div style={styles.dangerZone}>
        <h3>منطقة الخطر</h3>
        <div style={styles.dangerActions}>
          <button 
            onClick={handleLogout}
            style={{...styles.button, backgroundColor: '#ff9800'}}
            disabled={loading}
          >
            تسجيل الخروج
          </button>
          <button 
            onClick={handleDeleteAccount}
            style={{...styles.button, backgroundColor: '#f44336'}}
            disabled={loading}
          >
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
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
    gap: '15px',
    marginTop: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    textAlign: 'right',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    textAlign: 'right',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginTop: '10px',
    textAlign: 'right',
    padding: '10px',
    backgroundColor: '#ffebee',
    borderRadius: '5px',
  },
  success: {
    color: '#2e7d32',
    fontSize: '0.9rem',
    marginTop: '10px',
    textAlign: 'right',
    padding: '10px',
    backgroundColor: '#e8f5e8',
    borderRadius: '5px',
  },
  dangerZone: {
    marginTop: '30px',
    padding: '20px',
    border: '2px solid #f44336',
    borderRadius: '8px',
    backgroundColor: '#fff5f5',
  },
  dangerActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '15px',
  },
};

export default UserProfile; 