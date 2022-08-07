import Link from 'next/link'
import styles from '@/styles/Footer.module.css'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  return (
    <footer className={styles.footer}>
      {router.pathname !== '/about' &&
        <div>
          <p>Copyright &copy; DJ Events 2021</p>
          <Link href='/about'>About This Project</Link>
        </div>}

    </footer>
  )
}