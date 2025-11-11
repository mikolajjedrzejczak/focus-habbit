import styles from './AuthForm.module.scss';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleRegister,
  } = useAuth();
  return (
    <div className={styles.authForm}>
      <form onSubmit={handleRegister}>
        <h2 className={styles.authForm__header}>Stwórz konto</h2>
        <div className={styles.authForm__group}>
          <label htmlFor="email" className={styles.authForm__label}>
            Email
          </label>
          <input
            type="email"
            className={styles.authForm__input}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.authForm__group}>
          <label htmlFor="password" className={styles.authForm__label}>
            Hasło
          </label>
          <input
            type="password"
            className={styles.authForm__input}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            disabled={isLoading}
          />
        </div>

        {error && <p className={styles.authForm__error}>{error}</p>}

        <button
          type="submit"
          className={styles.authForm__button}
          disabled={isLoading}
        >
          {isLoading ? 'Tworzenie konta...' : 'Zarejestruj się'}
        </button>

        <p className={styles.authForm__switch}>
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
