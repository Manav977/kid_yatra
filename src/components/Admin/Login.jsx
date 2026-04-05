import React, { useState } from 'react';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <Lock size={28} color="#FF6B35" />
          </div>
          <h2>Admin Access</h2>
          <p>Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && <div className={styles.errorBadge}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <Mail size={18} className={styles.inputIcon} />
            <input 
              type="email" 
              placeholder="Admin Email" 
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <Lock size={18} className={styles.inputIcon} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.loginBtn}>
            {loading ? "Authenticating..." : "Login to Dashboard"}
            {!loading && <ArrowRight size={18} style={{marginLeft: '10px'}} />}
          </button>
        </form>
        
        <button className={styles.backHome} onClick={() => navigate('/')}>
          ← Back to Website
        </button>
      </div>
    </div>
  );
};

export default Login;