import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import Image from 'next/image'
import AuthContext from '@/context/AuthContext'
import { useContext } from 'react'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button className='btn-secondary btn-icon' onClick={logout}>
                  <Image src='/images/icon/logout.png' width={16} height={16} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href='/account/login'>
                <a className='btn-secondary btn-icon'>
                  <Image src='/images/icon/login.png' height={20} width={16} />
                  <span>Login</span>
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}