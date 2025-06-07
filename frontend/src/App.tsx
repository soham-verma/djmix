import { useState } from 'react';
import Login from './pages/Login';
import Mix from './pages/Mix';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <Mix />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}
