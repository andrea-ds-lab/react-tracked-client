import React, { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Type for the context value
interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
}

// Define the Login component as a named function
export function Login(): JSX.Element {
  const { login } = useContext(AuthContext) as AuthContextType;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("Siamo qui", await login)
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)
        }
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" > Login </button>
    </form>
  );
}
