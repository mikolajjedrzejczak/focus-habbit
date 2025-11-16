import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/auth.store';

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useAuth();

 

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navbar__brand}>
        FocusHabit
      </Link>
      <div className={styles.navbar__user_info}>
        <span className={styles.navbar__email}>{user?.email}</span>
        <button onClick={handleLogout} className={styles.navbar__logout_button}>
          Wyloguj
        </button>
      </div>
    </nav>
  );
};
