import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/AuthForm.module.css'
import Layout from '@/components/Layout'
import { useContext, useState } from 'react'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <Image src='/images/icon/user.png' height={32} width={32} />
          <span>Log In</span>
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Login" className='btn' />
          <p>
            Don't Have an account?
            <Link href='/account/register'> Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage