import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useState } from 'react';
import { loginRequest, registerRequest } from '../services/auth.service';
import { AxiosError } from 'axios';

export const useAuth = () => {
  const navigate = useNavigate();
  const zustandLogin = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginRequest({ email, password });
      const { token, user } = response.data;

      zustandLogin(token, user);

      navigate('/');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || 'Niepoprawny email lub hasło';
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerRequest({ email, password });

      navigate('/login');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || 'Niepoprawny email lub hasło';
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
    handleRegister,
  };
};
