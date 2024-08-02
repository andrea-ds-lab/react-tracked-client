import React, { useContext, useEffect, useState, JSX } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

// Define types for context and data
interface User {
  id: string;
  email: string;
  // Add other properties as needed
}

interface AuthContextType {
  user: User | null;
}

interface ProtectedData {
  // Define the shape of the protected data
  [key: string]: any;
}

// Define the Protected component
export function Protected(): JSX.Element {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [data, setData] = useState<ProtectedData | null>(null);

  useEffect(() => {
    if (user) {
      axios.get<ProtectedData>('/api/protected', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => setData(response.data))
        .catch(error => console.error('Error fetching protected data', error));
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view this page</div>;
  }

  return <div>Protected Data: {JSON.stringify(data)}</div>;
}
