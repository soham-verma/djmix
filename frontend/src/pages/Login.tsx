import { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={onLogin} disabled={!username}>Enter</button>
    </div>
  );
}
