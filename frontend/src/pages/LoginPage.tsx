import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import styles from './AuthForm.module.scss';

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  } = useAuth();

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleLogin}>
        <h2 className={styles.authForm__header}>Zaloguj się</h2>

        <div className={styles.authForm__group}>
          <label className={styles.authForm__label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.authForm__input}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.authForm__group}>
          <label className={styles.authForm__label} htmlFor="password">
            Hasło
          </label>
          <input
            className={styles.authForm__input}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {error && <p className={styles.authForm__error}>{error}</p>}

        <button
          type="submit"
          className={styles.authForm__button}
          disabled={isLoading}
        >
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>

        <p className={styles.authForm__switch}>
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
