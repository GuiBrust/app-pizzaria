import{ useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../../contexts/AuthContext';

export function Header() {

  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard" passHref>
          <Image src="/logo.svg" alt="Pizzaria" width={150} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category" passHref>
            <a>Categorias</a>
          </Link>

          <Link href="/product" passHref>
            <a>Produtos</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={20} />
          </button>
        </nav>
      </div>
    </header>
  )
}