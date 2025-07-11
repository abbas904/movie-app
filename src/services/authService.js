// Authentication Service for localStorage operations
class AuthService {
  // User registration
  static registerUser(userData) {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if email already exists
      const emailExists = users.some(user => user.email === userData.email);
      if (emailExists) {
        throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
      }
      
      // Add new user
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      
      return { success: true, message: 'تم إنشاء الحساب بنجاح!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // User login
  static loginUser(email, password) {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, message: 'تم تسجيل الدخول بنجاح!', user };
      } else {
        throw new Error('بيانات الدخول غير صحيحة');
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // User logout
  static logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    return { success: true, message: 'تم تسجيل الخروج بنجاح!' };
  }

  // Check if user is logged in
  static isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Get current user
  static getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Get all users
  static getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  // Update user profile
  static updateUserProfile(userId, updatedData) {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.email === userId);
      
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update current user if it's the same user
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.email === userId) {
          localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
        
        return { success: true, message: 'تم تحديث الملف الشخصي بنجاح!' };
      } else {
        throw new Error('المستخدم غير موجود');
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Delete user account
  static deleteUserAccount(email) {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const filteredUsers = users.filter(u => u.email !== email);
      
      localStorage.setItem('users', JSON.stringify(filteredUsers));
      
      // Logout if it's the current user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.email === email) {
        this.logoutUser();
      }
      
      return { success: true, message: 'تم حذف الحساب بنجاح!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Clear all data (for testing)
  static clearAllData() {
    localStorage.removeItem('users');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }
}

export default AuthService; 