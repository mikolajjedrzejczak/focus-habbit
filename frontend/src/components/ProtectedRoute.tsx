import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useEffect, useState } from 'react';
import { refreshRequest } from '../services/auth.service';

const ProtectedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth());
  const login = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await refreshRequest();

        const { accessToken, user } = response.data;

        login(accessToken, user);
      } catch (err) {
        console.log('Autentykacja nie powiodła się');
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuth) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;

  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
